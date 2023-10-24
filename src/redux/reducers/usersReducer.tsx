import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../Types/types";
import { Transaction } from "../../../Types/types";

export interface UserState {
  users: User[];
  allTransactions: Transaction[];
}

const initialState: UserState = {
  users: [],
  allTransactions: [{ payment: 100, participants: ["Hugo", "Seb", "Max"], date: "20-10-23", category: "Food", from: "Joe" }],
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
        ["to" + action.payload.name]: [{ refund: 0 }],
      }));
      state.users.push(action.payload);
    },

    addPayment: (state, action: PayloadAction<{ payment: number; from: number; participants: string[]; date: string; category: string; fromName: string }>) => {
      const { payment, from, participants, date, category, fromName } = action.payload;
      state.users[from].payment.unshift({ payment: payment, participants: participants, date: date });
      state.allTransactions.unshift({ payment: payment, participants: participants, date: date, category: category, from: fromName });
    },

    addDebt: (state, action: PayloadAction<{ toUser: string; date: string; valueOfDebt: number; participantsToDebt: string[]; category: string }>) => {
      const { toUser, date, valueOfDebt, participantsToDebt, category } = action.payload;

      participantsToDebt.forEach((participant) => {
        const id = parseInt(participant);
        if (!isNaN(id)) {
          const user: any = state.users[id];
          if (user) {
            if (!user[toUser]) {
              user[toUser] = [] as any[]; // Utilisation de 'as any[]' pour indiquer le type
            }
            user[toUser].push({ date: date, valueOfDebt: valueOfDebt, category: category });
          }
        }
      });
    },
    deleteUser: (state, action: PayloadAction<{ name: string }>) => {
      const userToDelete = action.payload;

      // Filtrer le tableau des utilisateurs pour exclure l'utilisateur à supprimer
      state.users = state.users.filter((user) => user.name !== userToDelete.name);

      // Mettre à jour les autres utilisateurs pour supprimer les propriétés correspondantes
      state.users.forEach((user) => {
        if (user.name !== userToDelete.name) {
          delete user["to" + userToDelete.name];
        }
      });
      state.allTransactions = state.allTransactions.filter((transaction) => {
        return transaction.from !== userToDelete.name;
      });

      // Mettre à jour les transactions existantes pour exclure les références à l'utilisateur supprimé
      state.allTransactions = state.allTransactions.filter((transaction) => {
        return transaction.from !== "to" + userToDelete.name && !transaction.participants.includes("to" + userToDelete.name);
      });
      state.users = state.users.map((user, index) => ({
        ...user,
        id: index,
      }));
    },
    addRefund: (state, action: PayloadAction<{ id: number; valueToRefund: number; userToRefund: "string" }>) => {
      const { id, valueToRefund, userToRefund } = action.payload;
      console.log(state.users[id], id, valueToRefund, userToRefund);
      state.users[id]["to" + userToRefund][0].refund = state.users[id]["to" + userToRefund][0].refund + valueToRefund;
    },
  },
});

export const { addUser, addDebt, addPayment, deleteUser, addRefund } = userSlice.actions;

export default userSlice.reducer;
