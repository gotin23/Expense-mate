import React, { SyntheticEvent } from "react";
import styles from "../../src/styles/PaymentForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Types/types";
import { useEffect, useState, ChangeEvent } from "react";
import { addDebt, addPayment } from "@/redux/reducers/usersReducer";

export default function PaymentForm({ name, id, setToggle, setTogglePaymentForm }) {
  const users = useSelector((state: RootState) => state.user);

  const names: string[] = users.users.map((user) => user.name);
  const dispatch = useDispatch();
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
  // const [toggleDebtModale, setToggleDebtModale] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [stepForm, setStepForm] = useState(1);
  const [note, setNote] = useState("");
  const handleStepForm = (e: SyntheticEvent) => {
    e.preventDefault();
    if (stepForm === 1 && parseFloat(amount) > 1) {
      setStepForm(2);
    }
    if (stepForm === 2) {
      setStepForm(3);
    }
    if (stepForm === 3) {
      console.log(note);
      handlePayment();
    }
  };
  const handlePreviousStep = () => {
    if (stepForm === 1) {
      setTogglePaymentForm(false);
    } else {
      setStepForm(stepForm - 1);
    }
  };
  const handlePayment = () => {
    // le montant
    const payment = parseFloat(amount);
    // les personne presente sur cette transaction et leur nombre
    const participantsObject = options.filter((el) => el.isChecked === true);
    const participants = participantsObject.map((participant) => participant.label);
    const numberOfParticipants = participants.length;
    const participantsToDebt = participants.filter((participant) => participant !== name);

    const ids = participantsToDebt.map((name) => {
      const user = users.users.find((user) => user.name === name);
      return user ? user.id.toString() : "";
    });

    // ce que doit chaque personne a celui qui paye
    const valueOfDebt = parseFloat((payment / numberOfParticipants).toFixed(2));

    const currentDate = new Date();
    const date = currentDate.toISOString().split("T")[0];
    const type = selectedOption;
    if (payment >= 1) {
      dispatch(addDebt({ toUser: "to" + name, date: date, valueOfDebt: valueOfDebt, participantsToDebt: ids, category: selectedOption }));
      dispatch(addPayment({ payment: payment, from: id, participants: participants, date: date, category: note, fromName: name }));
      // setToggleForm(!toggleForm);
      setTogglePaymentForm(false);
    }
  };

  const handleCheckBoxChange = (index: number) => {
    if (index >= 0 && index < options.length) {
      const newOptions = [...options];
      newOptions[index].isChecked = !newOptions[index].isChecked;
      setOptions(newOptions);
    }
  };
  console.log(options);
  const handleInputAmount = (e: ChangeEvent<HTMLInputElement>) => {
    if (/^\d*\.?\d*$/.test(amount)) {
      setAmount(e.target.value);
    }
  };
  const handleNote = (e: ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  return (
    <div className={styles["payment-container"]}>
      <h3>Make a payment from {name}</h3>
      <form>
        {stepForm === 1 && (
          <div className={styles["input-container"]}>
            <h3>Choose a amount:</h3>
            <div className={styles["amount-container"]}>
              {/* <label htmlFor="amount">Amount:</label> */}
              <input type="number" placeholder="0" autoFocus value={amount} className={styles["input-number"]} onChange={handleInputAmount} />
            </div>
            {/* <div className={styles["btns-container"]}>
              <button type="button" className={styles["btn-cancel"]}>
                Cancel
              </button>
              <button type="button" className={styles["btn-valide"]} onClick={handleStepForm}>
                Valider
              </button>
            </div> */}
          </div>
        )}
        {stepForm === 2 && (
          <div className={styles["step2-container"]}>
            <h3>Select users who will share that transaction</h3>
            <div className={styles["checkbox-container"]}>
              {/* <p className={styles["form-participants"]}>Participants:</p> */}
              {names.map((names, index) => (
                <div key={index} className={styles["label-and-checkbox"]}>
                  <label htmlFor="user-checkbox">{names}:</label>
                  <input
                    type="checkbox"
                    id={`user-checkbox-${index}`}
                    readOnly={name === names ? true : false}
                    checked={name !== names ? options[index]?.isChecked : true}
                    onChange={name === names ? undefined : () => handleCheckBoxChange(index)}
                  />
                </div>
              ))}
            </div>
            {/* <div className={styles["btns-container"]}>
              <button type="button" className={styles["btn-cancel"]}>
                Previous
              </button>
              <button type="button" className={styles["btn-valide"]} onClick={handleStepForm}>
                Valider
              </button>
            </div> */}
          </div>
        )}
        {stepForm === 3 && (
          <div className={styles["step3-container"]}>
            <h3>Add a note ?</h3>
            <div className={styles["note-container"]}>
              <input type="text" id="note" autoFocus value={note} onChange={handleNote}></input>
            </div>
            {/* <div className={styles["btns-container"]}>
              <button type="button" className={styles["btn-cancel"]}>
                Previous
              </button>
              <button type="button" className={styles["btn-valide"]} onClick={handleStepForm}>
                Valider
              </button>
            </div> */}
          </div>
        )}
        <div className={styles["btns-container"]}>
          <button type="button" className={styles["btn-cancel"]} onClick={handlePreviousStep}>
            {stepForm > 1 ? "previous" : "Cancel"}
          </button>
          <button type="submit" className={styles["btn-valide"]} onClick={handleStepForm}>
            {stepForm !== 3 ? "Next" : "Valide"}
          </button>
        </div>
      </form>
    </div>
  );
}
