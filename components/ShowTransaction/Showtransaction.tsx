import React from "react";
import styles from "../../src/styles/ShowTransaction.module.css";
import { TransactionDetail } from "../../Types/types";

type ShowTransactionProps = {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  transactionDetail: TransactionDetail;
};

export default function Showtransaction({ setToggle, transactionDetail }: ShowTransactionProps) {
  return (
    <div className={styles["transaction-container"]} onClick={() => setToggle(false)}>
      <div className={styles.transaction}>
        <button type="button" className={styles.close} onClick={() => setToggle(false)}>
          X
        </button>
        <h3>Transaction detail:</h3>
        <p>
          <span>From:</span>
          {transactionDetail.from}
        </p>
        <p>
          <span>Date:</span> {transactionDetail.date}
        </p>
        <p>
          <span>Participants:</span> {transactionDetail.participants.join(" ")}
        </p>
        <p>
          <span>Amount:</span> {transactionDetail.payment}
        </p>
        <p>
          <span>Note:</span> {transactionDetail.category}
        </p>
      </div>
    </div>
  );
}
