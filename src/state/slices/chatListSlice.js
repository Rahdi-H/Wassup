import { createSlice } from "@reduxjs/toolkit";

const chatListSlice = createSlice({
    name: 'chatList',
    initialState: {
        chatList: null,
    },
    reducers: {
        setChatList: (state, action) => {
            state.chatList = action.payload
        },
        clearChatList: (state, action) => {
            state.chatList = null
        }
}});

export const {setChatList, clearChatList} = chatListSlice.actions;
export default chatListSlice.reducer;