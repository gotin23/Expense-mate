import React from "react";
import styles from "../../src/styles/UserCard.module.css";
import { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { UseSelector } from "react-redux/es/hooks/useSelector";
// import { RootState } from "../../Types/types";
// import { addDebt, addPayment, deleteUser } from "@/redux/reducers/usersReducer";
import { UserCardProps } from "../../Types/types";
// import DebtModale from "../DebtModale/DebtModale";
import Image from "next/image";
// import deleteIcon from "../../public/assets/icons/delete-4-svgrepo-com.svg";
// import paymentIcon from "../../public/assets/icons/money-dollar-cash-payment-svgrepo-com.svg";
// import debtIcon from "../../public/assets/icons/wallet-money-cash-svgrepo-com.svg";
// import UserIcon from "../../public/assets/icons/user-svgrepo-com.svg";
import RightIcon from "../../public/assets/icons/right-one.svg";
import Link from "next/link";
import DeleteUser from "../DeleteUser/DeleteUser";
import DeleteIcon from "../../public/assets/icons/delete-4-svgrepo-com.svg";
import { modaleDeletefalse } from "@/redux/reducers/toggleModaleReducer";
import { ToggleState } from "../../Types/types";

export default function UserCard({ props }: UserCardProps) {
  const toggleDeleteModale = useSelector((state: ToggleState) => state.modale);
  const dispatch = useDispatch();

  const [toggleDelete, setToggleDelete] = useState(false);
  const handleShowDeleteModale = () => {
    dispatch(modaleDeletefalse());
    setToggleDelete(true);
  };

  return (
    <>
      {toggleDelete && !toggleDeleteModale && <DeleteUser name={props.name} setToggleDelete={setToggleDelete} />}
      <div className={styles["card-container"]}>
        <Image className={styles.delete} src={DeleteIcon} alt="Delete icon" onClick={handleShowDeleteModale} />
        <Link className={styles.link} href={`/Dashboard/${props.name}`}>
          <div className={styles.card}>
            <div className={styles["user-container"]}>
              <p>{props.name}</p>
            </div>
            <div className={styles["btn-plus"]}>
              <Image src={RightIcon} alt="right icon" />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
