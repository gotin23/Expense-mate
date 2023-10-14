import React from "react";
import styles from "../../src/styles/UserCard.module.css";
import { useState, ChangeEvent } from "react";

export default function UserCard({ props }) {
  const [toggleForm, setToggleForm] = useState(false);
  const [amount, setAmount] = useState("");
  const togglePaymentForm = () => {
    setToggleForm(!toggleForm);
  };

  const handleInputAmount = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^\d*\.?\d*$/.test(amount)) {
      setAmount(e.target.value);
    }
  };
  const handlePayment = () => {
    const payment = parseInt(amount);
    console.log(payment % 3);
  };

  return (
    <div className={styles.card}>
      <h2>{props.name}</h2>
      <button type="button" onClick={togglePaymentForm}>
        Payment
      </button>
      {toggleForm && (
        <>
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" onChange={handleInputAmount} />
          <button type="submit" onClick={handlePayment}>
            Pay!
          </button>
        </>
      )}
    </div>
  );
}
