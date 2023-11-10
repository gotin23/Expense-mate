import React, { SyntheticEvent } from "react";
import styles from "../../src/styles/Transaction.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Types/types";

export default function Transaction({ name }) {
  const users = useSelector((state: RootState) => state.user);
  console.log(
    users.allTransactions.filter((tran) => tran.participants.includes(name)),
    users.allTransactions
  );
  const dispatch = useDispatch();
  const handleInfo = (info: string) => {
    console.log(info);
  };
  const userTransaction = users.allTransactions.filter((tran) => tran.participants.includes(name));
  const mappedTransactions = userTransaction.map((transaction, index) => (
    <tr key={index}>
      <td className={styles.from}>{transaction.from}</td>
      <td onClick={() => handleInfo(transaction.date)}>{transaction.date}</td>
      <td>{transaction.category}</td>
      <td>{transaction.participants.join(", ")}</td>
      <td>{transaction.payment}</td>
    </tr>
  ));
  return (
    <>
      <div className={styles["transaction-container"]}>
        <h3>My transactions</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>From</th>
              <th>Date</th>
              <th>Note</th>
              <th>Participants</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>{mappedTransactions}</tbody>
        </table>
      </div>
    </>
  );
}
