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
export interface ToggleState {
  modale: boolean;
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
  setTogglePaymentForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TransactionProps {
  name: string;
}
export interface DeleteUserProps {
  name: string;
  setToggleDelete: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface UserCardProps {
  props: {
    name: string;
    id: number; // ou le type approprié pour 'id'
  };
}
export interface TransactionDetail {
  from: string;
  date: string;
  category: string;
  participants: string[];
  payment: number;
}
