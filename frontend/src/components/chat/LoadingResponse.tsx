// components/chat/LoadingResponse.tsx
import { Avatar, Box, Typography, CircularProgress, Paper } from "@mui/material";
import { useEffect, useState } from "react";

const loadingMessages = [
  "Processing your request...",
  "Fetching the best response for you...",
  "Analyzing your query...",
  "Generating a response...",
  "Hold on, I'm working on it..."
];

export const LoadingResponse = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        my: 1,
        gap: 2,
      }}
    >
      <Avatar sx={{ bgcolor: "#004d5612", color: "black" }}>
        <img src="/meta.svg" className="image-inverted" alt="openai" style={{ width: 30 }} />
      </Avatar>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          maxWidth: "80%",
          bgcolor: "transparent",
          color: "black",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress size={24} />
        <Typography fontSize={18}>
          {loadingMessages[currentMessageIndex]}
        </Typography>
      </Paper>
    </Box>
  );
};