import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { mode: "light" },
  reducers: {
    toggleMode(state) { state.mode = state.mode === "light" ? "dark" : "light"; }
  }
});

export const { toggleMode } = uiSlice.actions;
export default uiSlice.reducer;
