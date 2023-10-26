import React from "react";
import styles from "../../src/styles/UserCard.module.css";
import { useState, ChangeEvent } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../Types/types";
import { addDebt, addPayment, deleteUser } from "@/redux/reducers/usersReducer";
import { UserCardProps } from "../../Types/types";
import DebtModale from "../DebtModale/DebtModale";

export default function UserCard({ props }: UserCardProps) {
  const dispatch = useDispatch();
  const [toggleDelete, setToggleDelete] = useState(false);

  const users = useSelector((state: RootState) => state.user);

  const names: string[] = users.users.map((user) => user.name);
  useEffect(() => {
    const updatedOptions = names.map((name) => ({
      label: name,
      isChecked: true,
    }));
    setOptions(updatedOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

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
  const [toggleDebtModale, setToggleDebtModale] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const togglePaymentForm = () => {
    setToggleForm(!toggleForm);
  };
  const openDebtModale = () => {
    setToggleDebtModale(true);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleCheckBoxChange = (index: number) => {
    if (index >= 0 && index < options.length) {
      const newOptions = [...options];
      newOptions[index].isChecked = !newOptions[index].isChecked;
      setOptions(newOptions);
    }
  };

  const handleInputAmount = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^\d*\.?\d*$/.test(amount)) {
      setAmount(e.target.value);
    }
  };

  const handlePayment = () => {
    // le montant
    const payment = parseFloat(amount);
    // les personne presente sur cette transaction et leur nombre
    const participantsObject = options.filter((el) => el.isChecked === true);
    const participants = participantsObject.map((participant) => participant.label);
    const numberOfParticipants = participants.length;
    const participantsToDebt = participants.filter((participant) => participant !== props.name);

    const ids = participantsToDebt.map((name) => {
      const user = users.users.find((user) => user.name === name);
      return user ? user.id.toString() : "";
    });

    // ce qu doit chaque personne a celui qui paye
    const valueOfDebt = parseFloat((payment / numberOfParticipants).toFixed(2));

    const currentDate = new Date();
    const date = currentDate.toISOString().split("T")[0];
    const type = selectedOption;
    console.log(participants, options);

    dispatch(addDebt({ toUser: "to" + props.name, date: date, valueOfDebt: valueOfDebt, participantsToDebt: ids, category: selectedOption }));
    dispatch(addPayment({ payment: payment, from: props.id, participants: participants, date: date, category: selectedOption, fromName: props.name }));
  };
  const handleDeleteUser = () => {
    dispatch(deleteUser({ name: props.name }));
  };
  console.log(users.users);
  return (
    <>
      {toggleDebtModale ? (
        <DebtModale id={props.id} name={props.name} setToggle={setToggleDebtModale} />
      ) : (
        <div className={`${styles.card} ${toggleForm ? styles.active : ""}`}>
          <div className={styles["title-and-btns"]}>
            <h2>{props.name}</h2>
            <button onClick={() => setToggleDelete(!toggleDelete)} className={styles["btn-delete"]}>
              Delete user!
            </button>
            {toggleDelete && (
              <div className={styles["toggle-delete"]}>
                <p>Are you sure to delete that user?</p>
                <button onClick={handleDeleteUser}>Yes</button>
                <button onClick={() => setToggleDelete(!toggleDelete)}>No</button>
              </div>
            )}
            <button type="button" className={styles["btn-payment"]} onClick={togglePaymentForm}>
              Make Payment!
            </button>
            <button type="button" className={styles["btn-debt"]} onClick={openDebtModale}>
              Debts & Credits
            </button>
          </div>

          {toggleForm && (
            <div className={`${styles.form} ${styles.fadeIn}`}>
              <div className={styles["amount-container"]}>
                <label htmlFor="amount">Amount:</label>
                <input type="number" id="amount" className={styles["input-number"]} onChange={handleInputAmount} />
              </div>

              <div className={styles["checkbox-container"]}>
                <p className={styles["form-participants"]}>Participants:</p>
                {names.map((name, index) => (
                  <div key={index} className={styles["label-and-checkbox"]}>
                    <label htmlFor="user-checkbox">{name}:</label>
                    <input
                      type="checkbox"
                      id={`user-checkbox-${index}`}
                      readOnly={props.name === name ? true : false}
                      checked={props.name !== name ? options[index]?.isChecked : true}
                      onChange={props.name === name ? undefined : () => handleCheckBoxChange(index)}
                    />
                  </div>
                ))}
              </div>
              <div className={styles["category-and-pay"]}>
                <div>
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
                </div>

                <button type="submit" className={styles["btn-pay"]} onClick={handlePayment}>
                  Pay!
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
