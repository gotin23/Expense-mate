import React from "react";
import styles from "../../src/styles/DebtModale.module.css";
import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Types/types";
import { ModaleDebtProps } from "../../Types/types";
import { addRefund } from "../../src/redux/reducers/usersReducer";

export default function DebtModale({ id, name, setToggle }: ModaleDebtProps) {
  const users = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [toggleRefundForm, setToggleRefundForm] = useState(false);
  const [userToRefund, setUserToRefund] = useState("");
  const [valueToRefund, setValueToRefund] = useState("");
  const [debtAmount, setDebtAmount] = useState(0);

  type TransactionItem = {
    type: string;
    valueOfDebt: number;
  };
  const names: string[] = users.users.map((user) => user.name);
  const totalDebt = names.map((arrayName) => {
    const array = users.users[id]["to" + arrayName];
    const total = array?.reduce((accumulator: number, item: TransactionItem) => {
      if (item.valueOfDebt) {
        return accumulator + item.valueOfDebt;
      }
      return accumulator;
    }, 0);
    return { name: arrayName, total };
  });
  interface DebtItem {
    valueOfDebt: number;
  }
  const debtsOwedToMe = users.users.map((user) => {
    if (user["to" + name] && Array.isArray(user["to" + name])) {
      const totalValueOfDebt = user["to" + name].reduce((accumulator: number, item: DebtItem) => {
        if (item.valueOfDebt) {
          return accumulator + item.valueOfDebt;
        }
        return accumulator;
      }, 0);
      return { name: user.name, totalValueOfDebt };
    } else {
      return { name: user.name, totalValueOfDebt: 0 };
    }
  });
  const handleToggleRefundModale = (toRefund: string, debt: number) => {
    setToggleRefundForm(!toggleRefundForm);
    setUserToRefund(toRefund);
    setDebtAmount(debt);
  };
  const handleValueToRefund = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueToRefund(e.target.value);
  };
  const handleRefund = () => {
    if (debtAmount >= users.users[id]["to" + userToRefund][0].refund + parseFloat(valueToRefund)) {
      console.log(users.users[id]["to" + userToRefund][0].refund);
      const currentDate = new Date();
      const date = currentDate.toISOString().split("T")[0];
      dispatch(addRefund({ id: id, valueToRefund: parseFloat(valueToRefund), userRefund: userToRefund, from: name, date: date }));
      setToggleRefundForm(false);
    }
  };

  console.log(names, "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");

  return (
    <>
      {toggleRefundForm && (
        <div className={styles["modale-refund-container"]}>
          {
            <div className={styles["modale-refund"]}>
              <button onClick={() => setToggleRefundForm(!toggleRefundForm)}>X</button>
              <label htmlFor="number">Amount to refund:</label>
              <input type="number" id="number" value={valueToRefund} onChange={handleValueToRefund} />
              <button type="button" onClick={handleRefund}>
                Refund
              </button>
            </div>
          }
        </div>
      )}
      <div className={styles["modale-container"]}>
        {/* <h2>FriendWallet:</h2> */}
        <div className={styles.modale}>
          <button type="button" className={styles["btn-toggle-modale"]} onClick={() => setToggle(false)}>
            X
          </button>
          <h2>Debt Dashboard:</h2>
          {names.length > 1 ? (
            <ul>
              {totalDebt.map((result, index) => {
                const debtDifference = result.total - debtsOwedToMe[index].totalValueOfDebt;
                const user = users.users.filter((el) => el.name === result.name);
                const debtResult = isNaN(debtDifference) ? null : debtDifference - users.users[id]["to" + result.name][0].refund;
                const creditresult = isNaN(debtDifference) ? null : debtDifference + users.users[user[0].id]["to" + name][0].refund;

                if (isNaN(debtDifference)) {
                  return null; // Ne rien retourner si debtDifference est NaN
                }

                return (
                  <li key={index} className={styles["user-card"]}>
                    {<span>{`${result.name} :  `}</span>}

                    {debtDifference > 0 && debtResult !== 0 ? "Debt:" + " " + debtResult?.toFixed(2) : " "}
                    {debtDifference < 0 && creditresult !== 0 ? "Credit:" + " " + creditresult.toFixed(2) : " "}
                    {(creditresult && debtResult) === 0 && " 0"}

                    {debtDifference - users.users[id]["to" + result.name][0].refund > 0 && (
                      <button onClick={() => handleToggleRefundModale(result.name, debtDifference)} className={styles["btn-refund"]}>
                        Refund
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Not enought user in the group!</p>
          )}
        </div>
      </div>
    </>
  );
}
