import React, { useState } from "react";
import styles from "../../src/styles/Transaction.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Transaction } from "../../Types/types";
import { TransactionProps } from "../../Types/types";
import Showtransaction from "../ShowTransaction/Showtransaction";
import { TransactionDetail } from "../../Types/types";

export default function Transaction({ name }: TransactionProps) {
  const users = useSelector((state: RootState) => state.user);
  const [toggleShowTransaction, setToggleShowTransaction] = useState(false);

  const [transactionDetail, setTransactionDetail] = useState<TransactionDetail>({
    from: "",
    date: "",
    category: "",
    participants: [],
    payment: 0,
  });
  console.log(
    users.allTransactions.filter((tran) => tran.participants.includes(name)),
    users.allTransactions
  );
  // const dispatch = useDispatch();
  const showTransaction = (from: string, date: string, category: string, participants: string[], payment: number) => {
    console.log(from, date, category, participants, payment);
    setTransactionDetail({ from: from, date: date, category: category, participants: participants, payment: payment });
    setToggleShowTransaction(!toggleShowTransaction);
    console.log(transactionDetail);
  };
  const userTransaction = users.allTransactions.filter((tran) => tran.participants.includes(name));
  const mappedTransactions = userTransaction.map((transaction, index) => (
    <tr
      key={index}
      className={transaction.from === name ? styles["my-transaction"] : ""}
      onClick={() => showTransaction(transaction.from, transaction.date, transaction.category, transaction.participants, transaction.payment)}
    >
      <td>{transaction.from}</td>
      <td>{transaction.date}</td>
      <td>{transaction.category}</td>
      <td>{transaction.participants.join(", ")}</td>
      <td>{transaction.payment}</td>
    </tr>
  ));
  return (
    <>
      {toggleShowTransaction && <Showtransaction setToggle={setToggleShowTransaction} transactionDetail={transactionDetail} />}
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
