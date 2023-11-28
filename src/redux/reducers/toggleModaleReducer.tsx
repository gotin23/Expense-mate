import { createSlice } from "@reduxjs/toolkit";

const modaleSlice = createSlice({
  name: "modale",
  initialState: false,
  reducers: {
    modaleDeleteTrue: () => {
      return true;
    },
    modaleDeletefalse: () => {
      return false;
    },
  },
});

export const { modaleDeleteTrue, modaleDeletefalse } = modaleSlice.actions;

export default modaleSlice.reducer;
