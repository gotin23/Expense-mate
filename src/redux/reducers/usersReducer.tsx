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

      participantsToDebt.forEach((participant) => {
        const id = parseInt(participant);
        if (!isNaN(id)) {
          const user: any = state.users[id];
          if (user) {
            if (!user[toUser]) {
              user[toUser] = [] as any[]; // Utilisation de 'as any[]' pour indiquer le type
            }
            user[toUser].push({ date: date });
          }
        }
      });
      console.log(date, participantsToDebt, valueOfDebt, action.payload);
    },
  },
});

export const { addUser, addDebt } = userSlice.actions;

export default userSlice.reducer;
