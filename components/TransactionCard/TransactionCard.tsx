import React from "react";
import styles from "../../src/styles/TransactionCard.module.css";
import { TransactionProps } from "../../Types/types";

export default function TransactionCard({ props }: TransactionProps) {
  console.log(props, "les props");
  return (
    <div className={styles["transaction-card"]}>
      <h2>Transaction:</h2>
      <p>
        <span>Date:</span> {props.date}
      </p>
      <p>
        <span>From:</span> {props.from}
      </p>
      <p>
        <span>Category:</span> {props.category}
      </p>
      <p>
        <span>Amount:</span> {props.payment}
      </p>
      <p>
        <span>Participants:</span>
      </p>
      <ul>
        <br />
        {props.participants.map((participant, index) => (
          <li key={index}>{participant}/ </li>
        ))}
      </ul>
    </div>
  );
}
