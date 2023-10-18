import React from "react";
import styles from "../../src/styles/UserCard.module.css";
import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../Types/types";
import { addDebt } from "@/redux/reducers/usersReducer";

export default function UserCard({ props }) {
  const dispatch = useDispatch();
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

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

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
    // le montant
    const payment = parseInt(amount);
    // les personne presente sur cette transaction et leur nombre
    const participantsObject = options.filter((el) => el.isChecked === true);
    const participants = participantsObject.map((participant) => participant.label);
    const numberOfParticipants = participants.length;
    const participantsToDebt = participants.filter((participant) => participant !== props.name);
    console.log(participantsToDebt);
    const ids = participantsToDebt.map((name) => {
      const user = users.users.find((user) => user.name === name);
      return user ? user.id.toString() : "";
    });
    console.log(ids);

    // ce qu doit chaque personne a celui qui paye
    const valueOfDebt = parseFloat((payment / numberOfParticipants).toFixed(2));
    // la date du jour
    const currentDate = new Date();
    // la date au format "AAAA-MM-JJ" (ISO 8601)
    const date = currentDate.toISOString().split("T")[0];
    //  le type de transaction
    const type = selectedOption;

    dispatch(addDebt({ toUser: "to" + props.name, date: date, valueOfDebt: valueOfDebt, participantsToDebt: ids }));
    console.log(users.users);
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
            <div key={index}>
              <label htmlFor="user-checkbox">{name}</label>
              <input
                type="checkbox"
                id={`user-checkbox-${index}`}
                readOnly={props.name === name ? true : false}
                checked={props.name !== name ? options[index]?.isChecked : true}
                onChange={props.name === name ? undefined : () => handleCheckBoxChange(index)}
              />
            </div>
          ))}
          <label>Category</label>
          <select value={selectedOption} onChange={handleSelectChange}>
            <option value="void">-- Select an option --</option>
            <option value="Food">Food</option>
            <option value="Accomodation">Accomodation</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Utilities">Utilities</option>
            <option value="Gifts">Gifts</option>
            <option value="Alcohol">Alcohol</option>
            <option value="Bills">Bills</option>
            <option value="Sport and fitness">Sport and fitness</option>
          </select>
          <button type="submit" onClick={handlePayment}>
            Pay!
          </button>
        </>
      )}
    </div>
  );
}
