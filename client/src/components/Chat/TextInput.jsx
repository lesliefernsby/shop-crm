/* eslint-disable react/prop-types */
/* eslint-disable spaced-comment */
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import styles from "./Chat.module.css";

export default function TextInput({ socket, receiverId, admin }) {
  const authentication = useSelector((state) => state.authentication);
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send-message", {
      text,
      senderName: `${authentication.user.firstName} ${authentication.user.lastName}`,
      senderId: authentication.user.sub,
      isAdmin: admin,
      receiverId,
      createdAt: Date.now()
    });
    setText("");
  };
  return (
    <form className={styles.wrapForm} noValidate autoComplete="off">
      <TextField
        id="standard-text"
        label="Enter your message"
        name="text"
        onChange={handleChange}
        value={text}
        className={styles.wrapText}
        // margin="normal"
      />
      <Button
        onClick={sendMessage}
        variant="contained"
        color="primary"
        className={styles.button}
      >
        <SendIcon />
      </Button>
    </form>
  );
}
