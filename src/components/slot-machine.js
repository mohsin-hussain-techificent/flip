import { useState, useEffect } from "react";
import { Box, Typography, Paper, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useSlot } from "@/context/SlotContext";

const SlotMachine = () => {
  const { slotNumber } = useSlot();
  const [visibleResults, setVisibleResults] = useState(["", "", "", "", ""]);
  const [revealIndex, setRevealIndex] = useState(-1);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (slotNumber) startRevealSequence(slotNumber);
  }, [slotNumber]);

  const startRevealSequence = (numbers) => {
    setRevealIndex(-1);
    setVisibleResults(["", "", "", "", ""]);
    numbers.forEach((num, i) => {
      setTimeout(() => {
        setRevealIndex(i);
        setTimeout(() => {
          setVisibleResults((prev) => {
            const updated = [...prev];
            updated[i] = num;
            return updated;
          });
        }, 400);
      }, i * 800);
    });
  };

  return (
    <Box
      minHeight="94vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#121212"
      p={2}
    >
      <Paper
        sx={{
          px: {xs:1,md:4},
          py:{xs:3,md:4},
          borderRadius: 4,
          textAlign: "center",
          maxWidth: 800,
          width: "100%",
          bgcolor: "#1e1e1e",
        }}
      >
        <Typography
          variant="h2"
          color="gold"
          fontWeight="bold"
          mb={4}
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem", lg: "4rem" },
          }}
        >
          LOTTERY NUMBER
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          gap={isSmallScreen ? 1 : 2}
          width="100%"
        >
          {slotNumber.map((num, i) => (
            <motion.div
              key={i}
              style={{
                width: isSmallScreen ? 60 : 100,
                height: isSmallScreen ? 80 : 140,
                backgroundColor: "#1976d2",
                color: "white",
                fontSize: isSmallScreen ? "2rem" : "3rem",
                fontWeight: "bold",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                border: "4px solid #e0e0e0",
                position: "relative",
                overflow: "hidden",
                flex: "1",
                maxWidth: isSmallScreen ? 60 : 100,
              }}
              animate={{
                rotateY: revealIndex === i ? [0, 360, 0] : 0,
                scale: revealIndex === i ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {visibleResults[i] && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {visibleResults[i]}
                </motion.div>
              )}
            </motion.div>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default SlotMachine;
