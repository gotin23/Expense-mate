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

export type TransactionProps = {
  props: {
    payment: number;
    participants: string[];
    date: string;
    category: string;
    from: string;
  };
};

export interface UserCardProps {
  key: number;
  props: User;
}
