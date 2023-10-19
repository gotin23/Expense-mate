import React from "react";
import styles from "../../src/styles/AllTransaction.module.css";
import TransactionCard from "../TransactionCard/TransactionCard";
import { useSelector } from "react-redux";
import { RootState } from "../../Types/types";

export default function AllTransactions() {
  const users = useSelector((state: RootState) => state.user);
  console.log(users);
  return (
    <div className={styles["all-transactions-container"]}>
      {users.allTransactions.map((transaction, index) => (
        <TransactionCard
          key={index}
          props={{ payment: transaction.payment, participants: transaction.participants, date: transaction.date, category: transaction.category, from: transaction.from }}
        />
      ))}
    </div>
  );
}
