import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "@/redux/reducers/usersReducer";
import { RootState } from "../../Types/types";
import { User } from "../../Types/types";
import Link from "next/link";
import styles from "../../src/styles/AddUserToGroup.module.css";
import { AddUserToGroupProps } from "../../Types/types";
export default function AddUserToGroup({ setToggle }: AddUserToGroupProps) {
  const users = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const [userWaiting, setUserWaiting] = useState(1);
  const names: string[] = users.users.map((user) => user.name);

  const [name, setName] = useState("User");
  // const uniqueID = uuidv4();
  // console.log(uniqueID, "paricicici");

  const HandleAddUser = () => {
    if (!names.includes(name) && users.users.length < 10 && name.length < 13) {
      dispatch(addUser({ id: users.users.length, name: name, payment: [], ...names.reduce((acc, name: string) => ({ ...acc, ["to" + name]: [] }), {}) }));
      setUserWaiting(userWaiting + 1);

      setToggle(false);

      console.log(users);
    }
  };

  return (
    <div className={styles["form-container"]}>
      <form>
        {" "}
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="button" className={styles["btn-add"]} onClick={HandleAddUser}>
          {" "}
          Add!
        </button>
        <button className={styles["btn-close"]} onClick={() => setToggle(false)}>
          X
        </button>
      </form>
    </div>
  );
}
