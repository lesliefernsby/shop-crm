/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import styles from "./Chat.module.css";

export function MessageLeft(props) {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const displayName = props.displayName ? props.displayName : "anonymous";
  return (
    <div className={styles.messageRow}>
      <div className={styles.displayName}>{displayName}</div>
      <div className={styles.messageBlue}>
        <div>
          <p className={styles.messageContent}>{message}</p>
        </div>
        <div className={styles.messageTimeStampRight}>{timestamp}</div>
      </div>
    </div>
  );
}

export function MessageRight(props) {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  return (
    <div className={styles.messageRowRight}>
      <div className={styles.messageOrange}>
        <p className={styles.messageContent}>{message}</p>
        <div className={styles.messageTimeStampRight}>{timestamp}</div>
      </div>
    </div>
  );
}
