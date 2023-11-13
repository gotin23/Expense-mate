import React from "react";
import styles from "../../src/styles/DeleteUser.module.css";
import { useDispatch } from "react-redux";
import { deleteUser } from "@/redux/reducers/usersReducer";
import { DeleteUserProps } from "../../Types/types";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

export default function DeleteUser({ name, setToggleDelete }: DeleteUserProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleDeleteUser = () => {
    // router.push("/");
    dispatch(deleteUser({ name: name }));

    setToggleDelete(false);
    router.push("/");
  };
  return (
    <div className={styles["delete-container"]}>
      <h3>Are you sure you want to delete {name}?</h3>
      <div className={styles["btns-container"]}>
        <button type="button" className={styles.no} onClick={() => setToggleDelete(false)}>
          No
        </button>
        <button type="button" className={styles.yes} onClick={handleDeleteUser}>
          Yes
        </button>
      </div>
    </div>
  );
}
