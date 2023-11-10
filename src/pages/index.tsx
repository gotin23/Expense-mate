import Head from "next/head";
// import Image from "next/image";
import styles from "@/styles/Home.module.css";
import UserCard from "../../components/UserCard/UserCard";
// import Link from "next/link";
// import Navbar from "../../components/Navbar/Navbar";
// import { UserState } from "@/redux/reducers/usersReducer";

import { useDispatch, useSelector } from "react-redux";
// import { addUser } from "@/redux/reducers/usersReducer";
// import { RootState } from "../../Types/types";
// import { ChangeEvent, useState } from "react";
import AddUserToGroup from "../../components/AddUserToGroup/AddUserToGroup";
import { Analytics } from "@vercel/analytics/react";
// import MyGroup from "../../components/MyGroup/MyGroup";
import React, { useState, useEffect } from "react";
import DebtModale from "../../components/DebtModale/DebtModale";
import AddUserLogo from "../../public/assets/icons/Plus User Icon.svg";
import Image from "next/image";
import { RootState } from "../../Types/types";

export default function Home() {
  const users = useSelector((state: RootState) => state.user);
  const [toggleAddUser, setToggleAddUser] = useState(false);

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <div className={styles["main-title-container"]}>
          <h1>Expense Mate</h1>
          <h2 className={styles.description}>Simplifying shared expenses among friends, hassle-free!</h2>
        </div> */}
        <div className={styles["title-container"]}>
          <h1>Expense-Mate</h1>
        </div>
        <div className={styles["group-container"]}>
          {users.users.map((user) => (
            <UserCard key={user.id} props={{ name: user.name, id: user.id }} />
          ))}
        </div>

        <div className={styles["btn-add-user-container"]} onClick={() => setToggleAddUser(!toggleAddUser)}>
          <p>ADD USER</p>
          <Image src={AddUserLogo} alt="add-user-icon" className={styles["add-user-icon"]}></Image>
        </div>
        {toggleAddUser && <AddUserToGroup setToggle={setToggleAddUser} />}

        {/* <MyGroup /> */}
        <Analytics />
      </main>
    </>
  );
}
