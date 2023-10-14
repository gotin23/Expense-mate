import { User } from "@/redux/reducers/usersReducer";

export interface RootState {
  user: {
    users: User[];
  };
}

export interface UserCardProps {
  props: number;
}
