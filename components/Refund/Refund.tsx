import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRefund } from "@/redux/reducers/usersReducer";
import styles from "../../src/styles/Refund.module.css";

type RefundProps = {
  toRefund: string;
  name: string;
  id: number;
  debtAmount: number;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Refund({ toRefund, name, id, debtAmount, setToggle }: RefundProps) {
  const [valueToRefund, setValueToRefund] = useState("");

  const dispatch = useDispatch();
  const handleValueToRefund = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueToRefund(e.target.value);
  };
  const handleRefund = (e: SyntheticEvent) => {
    e.preventDefault();
    if (Math.abs(debtAmount) >= parseFloat(valueToRefund)) {
      const currentDate = new Date();
      const date = currentDate.toISOString().split("T")[0];
      dispatch(addRefund({ id: id, valueToRefund: parseFloat(valueToRefund), userRefund: toRefund, from: name, date: date }));
      setToggle(false);
    }
  };
  return (
    <div className={styles["modale-refund-container"]}>
      <div className={styles["modale-refund"]}>
        <h3>You want to make a refund :</h3>
        <form>
          <label htmlFor="number">Amount to refund:</label>
          <input type="number" min={0} id="number" value={valueToRefund} placeholder="0" autoFocus onChange={handleValueToRefund} />

          <div className={styles["btns-modale-container"]}>
            <button type="button" className={styles.no} onClick={() => setToggle(false)}>
              No
            </button>
            <button type="submit" className={styles.yes} onClick={handleRefund}>
              Yes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
