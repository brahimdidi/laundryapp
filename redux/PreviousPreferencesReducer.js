import { createSlice } from "@reduxjs/toolkit";

export const previousPreferencesSlice = createSlice({
    name: "previousPreferences",
    initialState: {
        previousPreferences: [],
    },
    reducers: {
        setPreferences: (state, action) => {
            state.previousPreferences = action.payload;
        }
    },
});

export const { setPreferences } = previousPreferencesSlice.actions;
export default previousPreferencesSlice.reducer;