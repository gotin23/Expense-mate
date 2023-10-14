import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "@/redux/reducers/usersReducer";
import { RootState } from "../../Types/types";
import { UserCardProps } from "../../Types/types";
import Link from "next/link";

export default function UserCard({ props }: UserCardProps) {
  const users = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const [userWaiting, setUserWaiting] = useState(1);
  const names: string[] = users.users.map((user) => user.name);

  const [name, setName] = useState("User1");

  const HandleAddUser = () => {
    if (userWaiting <= props) {
      setTimeout(() => {
        dispatch(addUser({ id: users.users.length, name: name, ...names.reduce((acc, name: string) => ({ ...acc, ["to" + name]: 0 }), {}) }));
        setUserWaiting(userWaiting + 1);

        setName("User" + (userWaiting + 1));
      }, 200);
    } else {
      console.log("trop");
    }
  };
  console.log(typeof props);

  return (
    <div>
      {userWaiting <= props ? (
        <>
          {" "}
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          <button type="button" onClick={HandleAddUser}>
            {" "}
            Add!
          </button>
        </>
      ) : (
        <>
          <p>Your group have been create!</p>
          <Link href="/myGroup">See my group</Link>
        </>
      )}
    </div>
  );
}
