import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Types/types";
import UserCard from "../../components/UserCard/UserCard";
import styles from "../../src/styles/MyGroup.module.css";
import AllTransactions from "../../components/AllTransactions/AllTransactions";
import AddUserToGroup from "../AddUserToGroup/AddUserToGroup";

export default function MyGroup() {
  const users = useSelector((state: RootState) => state.user);
  const [toggleAllTransactions, setToggleAllTransactions] = useState(false);
  const [toggleAddUser, setToggleAddUser] = useState(false);

  const handleToggleAllTransactions = () => {
    setToggleAllTransactions(!toggleAllTransactions);
  };
  const handleToggleAddUser = () => {
    setToggleAddUser(!toggleAddUser);
  };

  return (
    <div>
      <div className={styles.container}>
        {/* <h2 className={styles["group-title"]}>My group!</h2> */}
        <div className={styles["btns-container"]}>
          {" "}
          <button onClick={handleToggleAddUser} className={styles["btn-add-user"]}>
            Add user +
          </button>
          <button type="button" className={styles["btn-all-transactions"]} onClick={handleToggleAllTransactions}>
            {!toggleAllTransactions ? "All transactions" : "Back"}
          </button>
        </div>

        {toggleAddUser && <AddUserToGroup setToggle={setToggleAddUser} />}
        {users.users.length > 0 ? (
          <>
            {!toggleAllTransactions ? (
              <div className={styles["my-group-container"]}>
                {users.users.map((user) => (
                  <UserCard key={user.id} props={user} />
                ))}
              </div>
            ) : (
              <AllTransactions />
            )}
          </>
        ) : (
          <p className={styles.empty}>Nobody inside the group</p>
        )}
      </div>
    </div>
  );
}
