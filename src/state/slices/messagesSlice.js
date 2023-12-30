import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
    name: 'chatList',
    initialState: {
        messagesList: null,
    },
    reducers: {
        setMessagesList: (state, action) => {
            state.messagesList = action.payload
        },
        clearMessagesList: (state, action) => {
            state.messagesList = null
        }
}});

export const {setMessagesList, clearMessagesList} = messagesSlice.actions;
export default messagesSlice.reducer;