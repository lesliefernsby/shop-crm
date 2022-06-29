/* eslint-disable import/prefer-default-export */
/* eslint-disable default-param-last */
import { chatConstants } from "../constants/chatConstants";

const initialState = {
  empty: true,
  messages: [],
  isOpen: false,
};

export function chat(state = initialState, action) {
  switch (action.type) {
    case chatConstants.SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        empty: false,
      };
    case chatConstants.TOGGLE_OPEN_CHAT:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case chatConstants.LOAD_MESSAGES:
      return {
        ...state,
        messages: action.payload,
        empty: false,
      };

    default:
      return state;
  }
}
