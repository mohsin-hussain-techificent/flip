import { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Alert } from "@mui/material";
import { useSlot } from "@/context/SlotContext";

const Admin = () => {
  const { setSlotNumber } = useSlot();
  const [inputNumber, setInputNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setInputNumber(value);
    setMessage("");
  };

  const handleSubmit = () => {
    if (inputNumber.length !== 5) {
      setMessage("Please enter exactly 5 digits");
      return;
    }
    const numberArray = inputNumber.split("");
    setSlotNumber(numberArray); // This updates localStorage and state
    setMessage("Number set successfully!");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="96vh" bgcolor="#f4f6f8">
      <Paper sx={{ padding: 4, borderRadius: 3, width: 400, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="primary" mb={2}>Enter Number</Typography>
        <TextField 
          label="Enter Number" 
          variant="outlined" 
          fullWidth 
          value={inputNumber}
          onChange={handleInputChange}
          inputProps={{ maxLength: 5 }}
          error={!!message && !message.includes("successfully")}
          helperText={message || "Must be exactly 5 digits"}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>Submit</Button>
        {message.includes("successfully") && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      </Paper>
    </Box>
  );
};

export default Admin;