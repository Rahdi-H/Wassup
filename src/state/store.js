import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import selectedUserReducer from './slices/seletedUserSlice';
import chatListReducer from './slices/chatListSlice';
import messagesReducer from './slices/messagesSlice';

const reducers = combineReducers({
    user: userReducer,
    selectedUser: selectedUserReducer,
    chatList: chatListReducer,
    messagesList: messagesReducer,
})

const store = configureStore({
    reducer: reducers
});

export default store;