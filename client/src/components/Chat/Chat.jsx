/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
import React, { useEffect } from "react";
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "./TextInput";
import { MessageLeft, MessageRight } from "./Message";
import styles from "./Chat.module.css";
import { chatActions } from "../../redux/actions/chatActions";

function Chat({ socket }) {
  const chat = useSelector((state) => state.chat);
  const authentication = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authentication.user) dispatch(chatActions.loadMessages(authentication.user.sub));
  }, []);

  return (
    <div className={styles.Container}>
      <Paper className={styles.Paper}>
        <Paper id="style-1" className={styles.MessagesBody}>
          {chat.messages.map((message) =>
            !(message.senderRole === 'Admin' || message.isAdmin) ? (
              <MessageRight
                key={message.createdAt}
                message={message.text}
                timestamp={new Date(message.createdAt).toLocaleTimeString()}
                displayName={message.senderName}
              />
            ) : (
              <MessageLeft
                key={message.createdAt}
                message={message.text}
                timestamp={new Date(message.createdAt).toLocaleTimeString()}
                displayName={message.senderName}
              />
            )
          )}
        </Paper>
        <TextInput socket={socket} receiverId={null} admin={false} />
      </Paper>
    </div>
  );
}

export default Chat;
  