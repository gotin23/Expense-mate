import Head from "next/head";
// import Image from "next/image";
import styles from "@/styles/Home.module.css";
import UserCard from "../../components/UserCard/UserCard";
// import Link from "next/link";
// import Navbar from "../../components/Navbar/Navbar";
// import { UserState } from "@/redux/reducers/usersReducer";

import { useDispatch, useSelector } from "react-redux";
import AddUserToGroup from "../../components/AddUserToGroup/AddUserToGroup";
import { Analytics } from "@vercel/analytics/react";

import React, { useState } from "react";
import { modaleDeleteTrue } from "@/redux/reducers/toggleModaleReducer";
import AddUserLogo from "../../public/assets/icons/Plus User Icon.svg";
import Image from "next/image";
import { RootState, ToggleState } from "../../Types/types";

export default function Home() {
  const users = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const [toggleAddUser, setToggleAddUser] = useState(false);
  const handleModaleAddUser = () => {
    setToggleAddUser(!toggleAddUser);
    dispatch(modaleDeleteTrue());
  };

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" user-scalable="no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {toggleAddUser && <AddUserToGroup setToggle={handleModaleAddUser} />}
        <div className={styles["title-container"]}>
          <h1>Expense-Mate</h1>
        </div>
        <div className={styles["group-container"]}>
          {users.users.map((user) => (
            <UserCard key={user.id} props={{ name: user.name, id: user.id }} />
          ))}
          {users.users.length === 0 && <p className={styles.empty}>Add users to start</p>}
        </div>

        <div className={styles["btn-add-user-container"]} onClick={handleModaleAddUser}>
          <p>ADD USER</p>
          <Image src={AddUserLogo} alt="add-user-icon" className={styles["add-user-icon"]}></Image>
        </div>

        <Analytics />
      </main>
    </>
  );
}
