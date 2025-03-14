import { useState } from "react";
import { motion } from "framer-motion";

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const getRandomNumber = () =>
  numbers[Math.floor(Math.random() * numbers.length)];

const SlotMachine = () => {
  const [spinning, setSpinning] = useState(false);
  const [results, setResults] = useState(["0", "0", "0", "0", "0"]);

  const spinReels = () => {
    setSpinning(true);

    setTimeout(() => {
      const newResults = Array.from({ length: 5 }, () => getRandomNumber());
      setResults(newResults);
      setSpinning(false);
    }, 3000);
  };

  return (
    <div className="slot-machine">
      <div className="reels">
        {results.map((num, index) => (
          <motion.div
            key={index}
            className="reel"
            animate={{ y: spinning ? [0, -200, 0] : 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            {num}
          </motion.div>
        ))}
      </div>
      {/* <button onClick={spinReels} disabled={spinning} className="spin-btn">
        {spinning ? "Spinning..." : "SPIN 🎰"}
      </button> */}
    </div>
  );
};

export default SlotMachine;
