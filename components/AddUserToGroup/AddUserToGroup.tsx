import React, { SyntheticEvent } from "react";
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
  const [toggleMsgUsernameLength, setToggleMsgUsernameLength] = useState(false);
  const [toggleMsgUsernameExist, setToggleMsgUsernameExist] = useState(false);
  const [toggleMsgMaximumPeopleInGroup, setToggleMaximunPeopleInGroup] = useState(false);

  const HandleAddUser = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!names.includes(name) && users.users.length < 10 && name.length < 18) {
      dispatch(addUser({ id: users.users.length, name: name, payment: [], ...names.reduce((acc, name: string) => ({ ...acc, ["to" + name]: [{ refund: 0 }] }), {}) }));
      setUserWaiting(userWaiting + 1);

      setToggle(false);
    } else if (name.length >= 18) {
      setToggleMsgUsernameLength(!toggleMsgUsernameLength);
    } else if (users.users.length >= 10) {
      setToggleMaximunPeopleInGroup(!toggleMsgMaximumPeopleInGroup);
    } else if (names.includes(name)) {
      setToggleMsgUsernameExist(!toggleMsgUsernameExist);
    }
  };

  return (
    <div className={styles["form-container"]}>
      <form>
        {" "}
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        {toggleMsgUsernameLength && <p>Please ensure that your username does not exceed 18 characters</p>}
        {toggleMsgMaximumPeopleInGroup && <p>Group limit: Maximum of 10 members per group allowed</p>}
        {toggleMsgUsernameExist && <p>The user must choose a name that is different from those already in the group</p>}
        <button type="submit" className={styles["btn-add"]} onClick={HandleAddUser}>
          {" "}
          Add!
        </button>
        <button type="button" className={styles["btn-close"]} onClick={() => setToggle(false)}>
          X
        </button>
      </form>
    </div>
  );
}
