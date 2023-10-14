import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Définissez le type pour les objets utilisateur
export interface User {
  id: number;
  name: string;

  // Autres propriétés d'utilisateur
}

// Définissez le type d'état initial
export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const newUser = action.payload;
      // Modifier chaque utilisateur existant en ajoutant une nouvelle propriété
      state.users = state.users.map((user) => ({
        ...user,
        ["to" + action.payload.name]: 0,
      }));
      state.users.push(action.payload);
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
