import React from "react";
import { useState } from "react";
import styles from "../../src/styles/AllTransaction.module.css";
import TransactionCard from "../TransactionCard/TransactionCard";
import { useSelector } from "react-redux";
import { RootState } from "../../Types/types";

export default function AllTransactions() {
  const users = useSelector((state: RootState) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 6;

  // Calcule l'indice de début et de fin des transactions à afficher
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = users.allTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPayment = currentTransactions.reduce((total, transaction) => {
    return total + transaction.payment;
  }, 0);
  return (
    <>
      <div className={styles["all-transactions-container"]}>
        {currentTransactions.map((transaction, index) => (
          <TransactionCard
            key={index}
            props={{
              payment: transaction.payment,
              participants: transaction.participants,
              date: transaction.date,
              category: transaction.category,
              from: transaction.from,
            }}
          />
        ))}

        <div className={styles.pagination}>
          {users.allTransactions.length > transactionsPerPage && (
            <ul>
              {Array.from({ length: Math.ceil(users.allTransactions.length / transactionsPerPage) }).map((_, i) => (
                <li key={i}>
                  <button onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
