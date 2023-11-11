export interface User {
  id: number;
  name: string;
  payment: any[];
  [key: string]: any;
}

export interface RootState {
  user: {
    users: User[];
    allTransactions: Transaction[];
  };
}

export type AddUserToGroupProps = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ModaleDebtProps = {
  id: number;
  name: string;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Transaction = {
  payment: number;
  participants: string[];
  date: string;
  category: string;
  from: string;
};

export interface PaymentFormProps {
  name: string;
  id: number;
  // setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setTogglePaymentForm: React.Dispatch<React.SetStateAction<boolean>>;
}

// export type TransactionProps = {
//   props: {
//     payment: number;
//     participants: string[];
//     date: string;
//     category: string;
//     from: string;
//   };
// };
export interface TransactionProps {
  name: string;
}
export interface DeleteUserProps {
  name: string;
  // setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleDelete: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface UserCardProps {
  props: {
    name: string;
    id: number; // ou le type approprié pour 'id'
  };
}
// export interface UserCardProps {
//   key: number;
//   props: String;
// }
