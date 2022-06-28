/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
import React, { useEffect } from "react";
import { Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TextInput from "../Chat/TextInput";
import { chatActions } from "../../redux/actions/chatActions";
import { MessageLeft, MessageRight } from "../Chat/Message";
import styles from "./Admin.module.css";

function AdminChat({ socket }) {
  const chat = useSelector((state) => state.chat);
  const authentication = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(chatActions.loadMessages(params.id));
  }, []);

  return (
    <div className={styles.MainContainer}>
      <div className={styles.Container}>
        <Paper className={styles.Paper}>
          <Paper id="style-1" className={styles.MessagesBody}>
            {chat.messages.map((message) =>
              message.senderRole === "Admin" || message.isAdmin ? (
                <MessageRight
                  key={message.id}
                  message={message.text}
                  timestamp={new Date(message.createdAt).toLocaleTimeString()}
                  displayName={message.senderName}
                />
              ) : (
                <MessageLeft
                  key={message.id}
                  message={message.text}
                  timestamp={new Date(message.createdAt).toLocaleTimeString()}
                  displayName={message.senderName}
                />
              )
            )}
          </Paper>
          <TextInput socket={socket} receiverId={params.id} admin={true} />
        </Paper>
      </div>
    </div>
  );
}

export default AdminChat;
