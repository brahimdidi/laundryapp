import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userCredential",
    initialState: {
        userCredential: {},
    },
    reducers: {
        setUser: (state, action) => {
            state.userCredential = action.payload;
        },
        removeUser: (state) => {
            state.userCredential = null;
        }
    }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;