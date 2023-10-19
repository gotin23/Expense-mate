// import { User } from "@/redux/reducers/usersReducer";

export interface User {
  id: number;
  name: string;
  payment: any[];
  [key: string]: any;
  // Autres propriétés d'utilisateur
}

export interface RootState {
  user: {
    users: User[];
    allTransactions: Transaction[];
  };
}

export type AddUserToGroupProps = {
  props: number;
};
export type Transaction = {
  payment: number;
  participants: string[];
  date: string;
  category: string;
  from: string;
};
export type TransactionProps = {
  props: {
    payment: number;
    participants: string[];
    date: string;
    category: string;
    from: string;
  };
};
// export type TransactionProps = {
//   transaction: Transaction;
// };

export interface UserCardProps {
  key: number;
  props: User;
}
