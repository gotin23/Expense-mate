import React, { SyntheticEvent } from "react";
import styles from "../../src/styles/Balance.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Refund from "../Refund/Refund";

import { RootState } from "../../Types/types";
type BalanceProps = {
  id: number;
  name: string;
};

export default function Balance({ id, name }: BalanceProps) {
  const users = useSelector((state: RootState) => state.user);
  const [userToRefund, setUserToRefund] = useState("");
  //   const [valueToRefund, setValueToRefund] = useState("");
  const [debtAmount, setDebtAmount] = useState(0);
  const [toggleRefundForm, setToggleRefundForm] = useState(false);
  const dispatch = useDispatch();
  type TransactionItem = {
    type: string;
    valueOfDebt: number;
  };
  const names: string[] = users.users.map((user) => user.name);

  const totalDebtArray = names.map((arrayName) => {
    const array = users.users[id] && users.users[id]["to" + arrayName];
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
  const totalDebtArrayfilter = totalDebtArray.filter((item) => item.name !== name);

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

  return (
    <>
      {toggleRefundForm && <Refund toRefund={userToRefund} name={name} id={id} debtAmount={debtAmount} setToggle={setToggleRefundForm} />}
      <div className={styles["debt-container"]}>
        <h3>Balance details:</h3>
        <p className={styles.balance}>Balance</p>
        <div>
          <ul>
            {totalDebtArrayfilter.map((result, index) => {
              const user = users.users.filter((el) => el.name === result.name);

              let myRefund = users.users[user[0].id]["to" + name];
              myRefund = myRefund && myRefund[0].refund;
              let mateRefund = users.users[id] && users.users[id]["to" + result.name];
              mateRefund = mateRefund && mateRefund[0].refund;
              const idFilter = users.users.filter((el) => el.name === result.name);

              const totalBalanceResult = debtsOwedToMe[idFilter[0].id].totalValueOfDebt - result.total - (myRefund - mateRefund);

              return (
                <li key={index} className={styles["user-card"]}>
                  {<p>{`${result.name} :  `}</p>}
                  {totalBalanceResult < 0 && (
                    <button onClick={() => handleToggleRefundModale(result.name, totalBalanceResult)} className={styles["btn-refund"]}>
                      Refund
                    </button>
                  )}

                  {totalBalanceResult < 0 && (
                    <p>
                      <span className={styles.negative}>{totalBalanceResult.toFixed(2)}</span>
                    </p>
                  )}
                  {totalBalanceResult > 0 && (
                    <p>
                      <span className={styles.positive}>{totalBalanceResult.toFixed(2)}</span>
                    </p>
                  )}
                  {totalBalanceResult === 0 && <p>0</p>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
