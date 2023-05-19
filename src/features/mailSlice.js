import { createSlice } from "@reduxjs/toolkit";

export const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    sendMessage: false,
    selectedMail: null,
  },
  reducers: {
    selMail: (state, action) => {
      state.selectedMail = action.payload;
    },
    openSendMessage: (state) => {
      state.sendMessage = true;
    },
    closeSendMessage: (state) => {
      state.sendMessage = false;
    },
  },
});

export const {selMail ,openSendMessage,closeSendMessage}=mailSlice.actions
export const selectSelectedMail = (state) => state.mail.selectedMail;
export const selectMail=state=>state.mail.sendMessage
export default mailSlice.reducer