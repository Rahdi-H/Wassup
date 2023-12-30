import { createSlice } from "@reduxjs/toolkit";

const selectedUserSlice = createSlice({
    name: 'selectedUser',
    initialState: {
        selectedUser: null,
    },
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        },
        clearSelectedUser: (state, action) => {
            state.selectedUser = null
        }
}});

export const {setSelectedUser, clearSelectedUser} = selectedUserSlice.actions;
export default selectedUserSlice.reducer;