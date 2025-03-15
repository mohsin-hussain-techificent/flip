import { createContext, useContext, useState, useEffect } from "react";

const SlotContext = createContext();

export const SlotProvider = ({ children }) => {
  const [slotNumber, setSlotNumber] = useState(["0", "0", "0", "0", "0"]);

  // Sync state with localStorage
  useEffect(() => {
    const storedNumbers = JSON.parse(localStorage.getItem("slotNumbers")) || ["0", "0", "0", "0", "0"];
    setSlotNumber(storedNumbers);
  }, []);

  // Update localStorage and state when slotNumber changes
  const updateSlotNumber = (numbers) => {
    localStorage.setItem("slotNumbers", JSON.stringify(numbers));
    setSlotNumber(numbers);
  };

  // Listen for storage events (changes in other tabs)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "slotNumbers") {
        setSlotNumber(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <SlotContext.Provider value={{ slotNumber, setSlotNumber: updateSlotNumber }}>
      {children}
    </SlotContext.Provider>
  );
};

export const useSlot = () => useContext(SlotContext);