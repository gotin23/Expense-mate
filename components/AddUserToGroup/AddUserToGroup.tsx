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

  const [name, setName] = useState("");
  const [toggleMsgUsernameLength, setToggleMsgUsernameLength] = useState(false);
  const [toggleMsgUsernameExist, setToggleMsgUsernameExist] = useState(false);
  const [toggleMsgMaximumPeopleInGroup, setToggleMaximunPeopleInGroup] = useState(false);

  const HandleAddUser = (e: SyntheticEvent) => {
    const nameWithoutSpace = name.replace(/ /g, "");
    e.preventDefault();
    if (!names.includes(nameWithoutSpace) && users.users.length < 10 && nameWithoutSpace.length < 18) {
      dispatch(
        addUser({
          id: users.users.length,
          name: nameWithoutSpace,
          payment: [],
          ...names.reduce((acc, name: string) => ({ ...acc, ["to" + name.replace(/ /g, "")]: [{ refund: 0 }] }), {}),
        })
      );
      setUserWaiting(userWaiting + 1);

      setToggle(false);
    } else if (nameWithoutSpace.length >= 18) {
      setToggleMsgUsernameLength(!toggleMsgUsernameLength);
    } else if (users.users.length >= 10) {
      setToggleMaximunPeopleInGroup(!toggleMsgMaximumPeopleInGroup);
    } else if (names.includes(nameWithoutSpace)) {
      setToggleMsgUsernameExist(!toggleMsgUsernameExist);
    }
  };
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const onlyLetters = /^[A-Za-z]+$/;

    if (onlyLetters.test(inputValue) || inputValue === "") {
      setName(inputValue);
    }
  };
  return (
    <div className={styles["form-container"]}>
      <form>
        {" "}
        <h2>Choose a username!</h2>
        <div className={styles["input-container"]}>
          <label htmlFor="name">Username:</label>
          <input type="text" id="name" value={name} placeholder="Enter a name" autoFocus onChange={handleUsername} />
        </div>
        {toggleMsgUsernameLength && <p>Please ensure that your username does not exceed 18 characters</p>}
        {toggleMsgMaximumPeopleInGroup && <p>Group limit: Maximum of 10 members per group allowed</p>}
        {toggleMsgUsernameExist && <p>The user must choose a name that is different from those already in the group</p>}
        <div className={styles["btns-container"]}>
          <button type="button" className={styles["btn-cancel"]} onClick={() => setToggle(false)}>
            {" "}
            Cancel
          </button>
          <button type="submit" className={styles["btn-ok"]} onClick={HandleAddUser}>
            {" "}
            OK
          </button>
        </div>
      </form>
    </div>
  );
}
