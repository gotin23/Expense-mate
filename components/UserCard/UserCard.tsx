import React from "react";
import styles from "../../src/styles/UserCard.module.css";
import { useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../Types/types";

export default function UserCard({ props }) {
  const users = useSelector((state: RootState) => state.user);
  const names: string[] = users.users.map((user) => user.name);

  interface Options {
    label: string;
    isChecked: boolean;
  }

  const initialOptions: Options[] = names.map((name) => ({
    label: name,
    isChecked: true,
  }));
  const [options, setOptions] = useState<Options[]>(initialOptions);

  const [toggleForm, setToggleForm] = useState(false);
  const [amount, setAmount] = useState("");

  const handleCheckBoxChange = (index: number) => {
    if (index >= 0 && index < options.length) {
      console.log(options);
      const newOptions = [...options];
      newOptions[index].isChecked = !newOptions[index].isChecked;
      setOptions(newOptions);
    }
  };

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

    const participantsObject = options.filter((el) => el.isChecked === true);
    // const participants = options.filter((el) => el.isChecked === true);
    const participants = participantsObject.map((participant) => participant.label);
    const numberOfParticipants = participants.length;
    console.log(numberOfParticipants);
    const valueOfDebt = parseFloat((payment / numberOfParticipants).toFixed(2));
    const currentDate = new Date();

    // Pour obtenir la date au format "AAAA-MM-JJ" (ISO 8601)
    const date = currentDate.toISOString().split("T")[0];

    console.log(valueOfDebt, date);
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
          {names.map((name, index) => (
            <>
              <label htmlFor="user-checkbox">{name}</label>
              <input type="checkbox" id={`user-checkbox-${index}`} checked={options[index]?.isChecked} onChange={() => handleCheckBoxChange(index)} />
            </>
          ))}
          <button type="submit" onClick={handlePayment}>
            Pay!
          </button>
        </>
      )}
    </div>
  );
}
