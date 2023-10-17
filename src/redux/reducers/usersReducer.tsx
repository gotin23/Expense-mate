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
        ["to" + action.payload.name]: [],
      }));
      state.users.push(action.payload);
    },
    addDebt: (state, action: PayloadAction<{ toUser: string; date: string; valueOfDebt: number; participantsToDebt: string[] }>) => {
      const { toUser, date, valueOfDebt, participantsToDebt } = action.payload;
      // const userToUpdate = state.users.find((user) => user.name === participants[0]);
      // console.log(userToUpdate);
      // userToUpdate.toUser.push("hello");
      participantsToDebt.forEach((participant) => {
        const id = parseInt(participant); // Convertit la chaîne en entier
        if (!isNaN(id)) {
          // Vérifie si la conversion a réussi
          state.users[id][toUser].push({ date: date });
        }
      });
      console.log(date, participantsToDebt, valueOfDebt, action.payload);
    },
  },
});

export const { addUser, addDebt } = userSlice.actions;

export default userSlice.reducer;
