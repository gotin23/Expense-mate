import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const modaleSlice = createSlice({
  name: "modale",
  initialState: false,
  reducers: {
    modaleDeleteTrue: (state) => {
      return true;
    },
    modaleDeletefalse: (state) => {
      return false;
    },
  },
});

export const { modaleDeleteTrue, modaleDeletefalse } = modaleSlice.actions;

export default modaleSlice.reducer;
