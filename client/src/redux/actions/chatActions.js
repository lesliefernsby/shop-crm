
import { chatConstants } from "../constants/chatConstants";
import { chatService } from "../service/chatService";

function sendMessage(message) {
  return (dispatch) =>
    dispatch({ type: chatConstants.SEND_MESSAGE, payload: message });
}

function toggleOpenChat() {
  return (dispatch) => dispatch({ type: chatConstants.TOGGLE_OPEN_CHAT });
}

function loadMessages(userId) {
  return (dispatch) => {
    chatService.loadMessages(userId).then((messages) => {
      dispatch({ type: chatConstants.LOAD_MESSAGES, payload: messages });
    });
  };
}

export const chatActions = {
  sendMessage,
  toggleOpenChat,
  loadMessages,
};
