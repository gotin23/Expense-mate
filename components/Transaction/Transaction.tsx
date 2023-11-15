import React, { useState, useEffect } from "react";
import styles from "../../src/styles/Transaction.module.css";
import { useSelector } from "react-redux";
import { RootState, Transaction } from "../../Types/types";
import { TransactionProps } from "../../Types/types";
import Showtransaction from "../ShowTransaction/Showtransaction";
import { TransactionDetail } from "../../Types/types";

export default function Transaction({ name }: TransactionProps) {
  const users = useSelector((state: RootState) => state.user);
  const [toggleShowTransaction, setToggleShowTransaction] = useState(false);
  const [sortedTransaction, setSortedTransaction] = useState(users.allTransactions);
  const [sortedByAmount, setSortedByAmount] = useState(false);
  const [sortedByName, setSortedByName] = useState(false);
  const [sortedByDate, setSortedByDate] = useState(false);

  const [transactionDetail, setTransactionDetail] = useState<TransactionDetail>({
    from: "",
    date: "",
    category: "",
    participants: [],
    payment: 0,
  });

  useEffect(() => {
    setSortedTransaction(users.allTransactions);
  }, [users.allTransactions]);

  // const dispatch = useDispatch();
  const showTransaction = (from: string, date: string, category: string, participants: string[], payment: number) => {
    setTransactionDetail({ from: from, date: date, category: category, participants: participants, payment: payment });
    setToggleShowTransaction(!toggleShowTransaction);
  };
  const sortByAmount = () => {
    const sortedPaymentsAscending = sortedTransaction.slice().sort((a, b) => a.payment - b.payment);
    const sortedPaymentsDescending = sortedTransaction.slice().sort((a, b) => b.payment - a.payment);
    if (!sortedByAmount) {
      setSortedByAmount(true);
      setSortedTransaction(sortedPaymentsDescending);
    } else {
      setSortedByAmount(false);
      setSortedTransaction(sortedPaymentsAscending);
    }
  };
  const sortByName = () => {
    const sortedByNameAscending = sortedTransaction.slice().sort((a, b) => a.from.localeCompare(b.from));
    const sortedByNameDescending = sortedTransaction.slice().sort((a, b) => b.from.localeCompare(a.from));
    if (sortedByName) {
      setSortedByName(false);
      setSortedTransaction(sortedByNameDescending);
    } else {
      setSortedByName(true);
      setSortedTransaction(sortedByNameAscending);
    }
  };
  const sortByDate = () => {
    const sortedByLatestDate = users.allTransactions;
    const sortedByOldestDate = [...sortedByLatestDate].reverse();

    if (!sortedByDate) {
      setSortedByDate(true);
      setSortedTransaction(sortedByOldestDate);
    } else {
      setSortedByDate(false);
      setSortedTransaction(sortedByLatestDate);
    }
  };

  const userTransaction = sortedTransaction.filter((tran) => tran.participants.includes(name));
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
              <th onClick={sortByName}>From</th>
              <th onClick={sortByDate}>Date</th>
              <th>Note</th>
              <th>Participants</th>
              <th onClick={sortByAmount}>Amount</th>
            </tr>
          </thead>
          <tbody>{mappedTransactions}</tbody>
        </table>
        {userTransaction.length < 1 && <p className={styles.message}>No any transaction</p>}
      </div>
    </>
  );
}
