import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";

// Rule-based chatbot function
function chatbotResponse(input) {
  const msg = input.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello! 👋 How can I help you today?";
  } else if (msg.includes("how are you")) {
    return "I'm just code, but I'm doing great! 😄";
  } else if (msg.includes("your name")) {
    return "I’m RuleBot 🤖, your simple chatbot!";
  } else if (msg.includes("time")) {
    return "⏰ The current time is: " + new Date().toLocaleTimeString();
  } else if (msg.includes("date")) {
    return "📅 Today is: " + new Date().toLocaleDateString();
  } else if (msg.includes("joke")) {
    return "😂 Why don’t programmers like nature? It has too many bugs!";
  } else if (msg.includes("bye")) {
    return "Goodbye! 👋 Have a great day!";
  } else if (msg.includes("help")) {
    return "I can answer: hello, your name, time, date, joke, how are you, bye.";
  } else {
    return "❓ Sorry, I don't understand that. Try asking something else!";
  }
}

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm RuleBot 🤖. Type 'help' to see what I can do!",
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const botMsg = { sender: "bot", text: chatbotResponse(input) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  // Auto scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Paper
      elevation={4}
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: "#fafafa",
        display: "flex",
        flexDirection: "column",
        height: "500px",
      }}
    >
      {/* Chat messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          mb: 2,
          px: 1,
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "3px",
          },
        }}
      >
        {messages.map((msg, index) => (
          <Stack
            key={index}
            direction="row"
            justifyContent={msg.sender === "user" ? "flex-end" : "flex-start"}
            alignItems="center"
            spacing={1}
            sx={{ mb: 1 }}
          >
            {/* Bot Avatar */}
            {msg.sender === "bot" && (
              <Avatar sx={{ bgcolor: "#e0e0e0" }}>
                <SmartToyIcon />
              </Avatar>
            )}

            {/* Message bubble */}
            <Box
              sx={{
                bgcolor: msg.sender === "user" ? "#1976d2" : "#e0e0e0",
                color: msg.sender === "user" ? "white" : "black",
                px: 2,
                py: 1,
                borderRadius: 3,
                maxWidth: "70%",
              }}
            >
              <Typography variant="body1">{msg.text}</Typography>
            </Box>
          </Stack>
        ))}
        <div ref={chatEndRef} />
      </Box>

      {/* Input area */}
      <Stack direction="row" spacing={1}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button
          variant="contained"
          onClick={sendMessage}
          sx={{ borderRadius: 2 }}
        >
          Send
        </Button>
      </Stack>
    </Paper>
  );
}
