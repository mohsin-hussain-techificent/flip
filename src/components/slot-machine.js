"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Paper, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useSlot } from "@/context/SlotContext";

const SlotMachine = () => {
  const { slotNumber } = useSlot();
  const [spinningIndices, setSpinningIndices] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [finalNumbers, setFinalNumbers] = useState(["", "", "", "", ""]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Sound effects
  const playSpinSound = () => {
    const audio = new Audio("/spin-sound.mp3");
    audio.volume = 0.3;
    audio.play().catch((e) => console.log("Audio play failed:", e));
  };

  const playStopSound = () => {
    const audio = new Audio("/stop-sound.mp3");
    audio.volume = 0.5;
    audio.play().catch((e) => console.log("Audio play failed:", e));
  };

  useEffect(() => {
    if (slotNumber && slotNumber.length === 5) {
      // Reset states
      setFinalNumbers(["", "", "", "", ""]);
      setSpinningIndices([false, false, false, false, false]);

      // Start spinning sequence
      slotNumber.forEach((num, index) => {
        // Start spinning this digit
        setTimeout(() => {
          setSpinningIndices((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
          playSpinSound();

          // Stop spinning and reveal the number after a delay
          setTimeout(() => {
            setSpinningIndices((prev) => {
              const newState = [...prev];
              newState[index] = false;
              return newState;
            });

            setFinalNumbers((prev) => {
              const newNumbers = [...prev];
              newNumbers[index] = num;
              return newNumbers;
            });
            playStopSound();
          }, 2000); // Spin duration for each number
        }, index * 800); // Stagger start of each number's spin
      });
    }
  }, [slotNumber]);

  return (
    <Box
      minHeight="92vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#121212"
      p={2}
    >
      <Paper
        sx={{
          px: { xs: 1, md: 4 },
          py: { xs: 3, md: 4 },
          borderRadius: 4,
          textAlign: "center",
          maxWidth: 800,
          width: "100%",
          bgcolor: "#1e1e1e",
          background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem", lg: "4rem" },
            fontWeight: "bold",
            mb: 4,
            color: "#FFD700",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            fontFamily: "'Impact', sans-serif",
          }}
        >
          TECIFICENT SPORT GALA
        </Typography>

        {/* Slot machine container */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            padding: { xs: 1, md: 2 },
            background: "linear-gradient(145deg, #B8860B, #CD7F32)",
            borderRadius: "16px",
            boxShadow:
              "inset 0 0 10px rgba(0,0,0,0.6), 0 5px 15px rgba(0,0,0,0.4)",
            border: "8px solid #D4AF37",
            maxWidth: "90%",
            mx: "auto",
            mb: 2,
          }}
        >
          {/* Slot machine reels container */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
              width: "100%",
              padding: 1,
              background: "#000",
              borderRadius: "8px",
            }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <SlotReel
                key={i}
                isSpinning={spinningIndices[i]}
                finalNumber={finalNumbers[i]}
                isSmallScreen={isSmallScreen}
              />
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

// Component for a single slot reel
const SlotReel = ({ isSpinning, finalNumber, isSmallScreen }) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: isSmallScreen ? 50 : 80,
        height: isSmallScreen ? 70 : 120,
        background: "#f5f5dc", // Cream background like in the image
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)",
        border: "2px solid #8B4513",
        perspective: "1000px",
        flex: 1,
      }}
    >
      {/* Left shadow overlay */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "20%",
          height: "100%",
          background: "linear-gradient(90deg, rgba(0,0,0,0.2), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Right shadow overlay */}
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "20%",
          height: "100%",
          background: "linear-gradient(-90deg, rgba(0,0,0,0.2), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Top and bottom shadow to create cylinder effect */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "15%",
          background: "linear-gradient(180deg, rgba(0,0,0,0.3), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "15%",
          background: "linear-gradient(0deg, rgba(0,0,0,0.3), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {isSpinning ? (
        <SpinningNumbers isSmallScreen={isSmallScreen} />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: isSmallScreen ? "2rem" : "3rem",
            fontWeight: "bold",
            color: "#000",
            textShadow: "0 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          {finalNumber}
        </motion.div>
      )}
    </Box>
  );
};

// Component for the spinning numbers effect
const SpinningNumbers = ({ isSmallScreen }) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % 10);
    }, 50); // Fast spinning

    return () => clearInterval(interval);
  }, []);

  // Create an array of numbers for the spinning reel
  const numbers = Array.from({ length: 30 }, (_, i) => i % 10);

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        animate={{
          y: [0, -1000],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {numbers.map((num, idx) => (
          <div
            key={idx}
            style={{
              height: isSmallScreen ? 70 : 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isSmallScreen ? "2rem" : "3rem",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            {num}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SlotMachine;
