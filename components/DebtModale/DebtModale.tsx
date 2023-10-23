import React from "react";
import styles from "../../src/styles/DebtModale.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Types/types";
import { ModaleDebtProps } from "../../Types/types";

export default function DebtModale({ id, name, setToggle }: ModaleDebtProps) {
  const users = useSelector((state: RootState) => state.user);

  console.log(users.users[id], "gege");
  //   const array = Object.keys(users.users[id]);
  //   const arrayNames = array.filter((item) => item.startsWith("to") && users.users[id][item].length > 0);
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

  return (
    <div className={styles["modale-container"]}>
      <h2>FriendWallet:</h2>
      <div className={styles.modale}>
        <button type="button" className={styles["btn-toggle-modale"]} onClick={() => setToggle(false)}>
          X
        </button>
        <h2>Debt Dashboard:</h2>
        <ul>
          {totalDebt.map((result, index) => {
            const debtDifference = result.total - debtsOwedToMe[index].totalValueOfDebt;
            if (isNaN(debtDifference)) {
              return null; // Ne rien retourner si debtDifference est NaN
            }

            return (
              <li key={index} className={debtDifference === 0 ? "" : debtDifference >= 0 ? styles.negative : styles.positive}>
                <span>{`${result.name}: `}</span>
                {debtDifference}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
