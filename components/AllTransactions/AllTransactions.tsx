import React from "react";
import { useState } from "react";
import styles from "../../src/styles/AllTransaction.module.css";
import TransactionCard from "../TransactionCard/TransactionCard";
import { useSelector } from "react-redux";
import { RootState } from "../../Types/types";

export default function AllTransactions() {
  const users = useSelector((state: RootState) => state.user);
  const names: string[] = users.users.map((user) => user.name);
  names.unshift("all-Users");
  const [selectedOption, setSelectedOption] = useState("all-Users");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 6;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = users.allTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const filteredTransactions = selectedOption === "all-Users" ? users.allTransactions : users.allTransactions.filter((transaction) => transaction.from === selectedOption);

  const totalPayment = currentTransactions.reduce((total, transaction) => {
    return total + transaction.payment;
  }, 0);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    setCurrentPage(1);
  };
  return (
    <>
      <div className={styles["all-transactions-container"]}>
        <div className={styles.search}>
          <label>Users</label>
          <select value={selectedOption} onChange={handleSelectChange}>
            {names.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        {filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction).map((transaction, index) => (
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
          {filteredTransactions.length > transactionsPerPage && (
            <ul>
              {/* Bouton pour la première page */}
              <li>
                <button onClick={() => setCurrentPage(1)}>1</button>
              </li>

              {/* Bouton pour la page précédente (si currentPage n'est pas déjà 1) */}
              {currentPage > 1 && (
                <li>
                  <button onClick={() => setCurrentPage(currentPage - 1)}>&lt;</button>
                </li>
              )}

              {/* Bouton pour la page suivante (si la page suivante existe) */}
              {currentPage < Math.ceil(filteredTransactions.length / transactionsPerPage) && (
                <li>
                  <button onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>
                </li>
              )}

              {/* Bouton pour la dernière page */}
              <li>
                <button onClick={() => setCurrentPage(Math.ceil(filteredTransactions.length / transactionsPerPage))}>
                  {Math.ceil(filteredTransactions.length / transactionsPerPage)}
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
