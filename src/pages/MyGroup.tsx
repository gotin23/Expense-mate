import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Types/types";
import UserCard from "../../components/UserCard/UserCard";
import styles from "../../src/styles/Mygroup.module.css";

export default function MyGroup() {
  const users = useSelector((state: RootState) => state.user);

  return (
    <div className={styles["my-group-container"]}>
      {users.users.map((user) => (
        <UserCard key={user.id} props={user} />
      ))}
    </div>
  );
}
