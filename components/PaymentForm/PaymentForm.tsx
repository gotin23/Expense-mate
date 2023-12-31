import React, { SyntheticEvent } from "react";
import styles from "../../src/styles/PaymentForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Types/types";
import { useEffect, useState, ChangeEvent } from "react";
import { addDebt, addPayment } from "@/redux/reducers/usersReducer";
import { PaymentFormProps } from "../../Types/types";

export default function PaymentForm({ name, id, setTogglePaymentForm }: PaymentFormProps) {
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

  const [amount, setAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [stepForm, setStepForm] = useState(1);
  const [note, setNote] = useState("");

  const handleStepForm = (e: SyntheticEvent) => {
    e.preventDefault();
    if (stepForm === 1 && parseFloat(amount) > 1) {
      setStepForm(2);
    }
    const oneIsChecked = options.some((objet) => objet.isChecked === true);

    if (stepForm === 2 && oneIsChecked) {
      setStepForm(3);
    }
    if (stepForm === 3 && note.length < 51) {
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
              <input type="number" min={0} placeholder="0" id="number" autoFocus value={amount} className={styles["input-number"]} onChange={handleInputAmount} />
            </div>
          </div>
        )}
        {stepForm === 2 && (
          <div className={styles["step2-container"]}>
            <h3>Select users who will share that transaction</h3>
            <div className={styles["checkbox-container"]}>
              {names.map((names, index) => (
                <div key={index} className={styles["label-and-checkbox"]}>
                  <label htmlFor={`user-checkbox-${index}`}>{names}:</label>
                  <input type="checkbox" id={`user-checkbox-${index}`} autoFocus checked={options[index]?.isChecked} onChange={() => handleCheckBoxChange(index)} />
                </div>
              ))}
            </div>
          </div>
        )}
        {stepForm === 3 && (
          <div className={styles["step3-container"]}>
            <h3>Add a note ?</h3>
            <div className={styles["note-container"]}>
              <input type="text" id="note" autoFocus value={note} placeholder="your note here" onChange={handleNote}></input>
              <span>Maximum caracter {note.length + "/50"}</span>
            </div>
          </div>
        )}
        <div className={styles["btns-container"]}>
          <button type="button" className={styles["btn-cancel"]} onClick={handlePreviousStep}>
            {stepForm > 1 ? "Previous" : "Cancel"}
          </button>
          <button type="submit" className={styles["btn-valide"]} onClick={handleStepForm}>
            {stepForm !== 3 ? "Next" : "Valide"}
          </button>
        </div>
      </form>
    </div>
  );
}
