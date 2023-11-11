import React, { SyntheticEvent } from "react";
import styles from "../../../src/styles/DebtModale.module.css";
import Image from "next/image";
import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Types/types";
import { ModaleDebtProps } from "../../../Types/types";
import { addRefund } from "../../redux/reducers/usersReducer";
import Transaction from "../../../components/Transaction/Transaction";
import PaymentForm from "../../../components/PaymentForm/PaymentForm";
import DeleteUser from "../../../components/DeleteUser/DeleteUser";
import BackLogo from "../../../public/assets/icons/Back.svg";
import DeleteIcon from "../../../public/assets/icons/delete-4-svgrepo-com.svg";
import PaymentIcon from "../../../public/assets/icons/wallet-money-cash-svgrepo-com.svg";
import HomeIcon from "../../../public/assets/icons/Home Icon.svg";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Dashboard() {
  const users = useSelector((state: RootState) => state.user);
  const router = useRouter();
  // Récupérez le chemin de l'URL actuelle
  const currentPath = router.asPath;
  // Trouvez le dernier index du caractère '/' dans le chemin de l'URL
  const lastIndex = currentPath.lastIndexOf("/");
  // Récupérez tout ce qui se trouve après le dernier '/'
  const name = lastIndex !== -1 ? currentPath.slice(lastIndex + 1) : "";
  const onUser = users.users.filter((el) => el.name === name);
  const id = onUser[0].id;

  // Faites quelque chose avec le contenu récupéré
  console.log("Contenu après le dernier '/':", id);
  const dispatch = useDispatch();
  const [toggleRefundForm, setToggleRefundForm] = useState(false);
  const [toggleDeleteUser, setToggleDeleteUser] = useState(false);
  const [togglePaymentForm, setTogglePaymentForm] = useState(false);
  const [userToRefund, setUserToRefund] = useState("");
  const [valueToRefund, setValueToRefund] = useState("");
  const [debtAmount, setDebtAmount] = useState(0);
  const [total, setTotal] = useState(0);
  console.log(users);

  type TransactionItem = {
    type: string;
    valueOfDebt: number;
  };
  const names: string[] = users.users.map((user) => user.name);

  const totalDebtArray = names.map((arrayName) => {
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

  const creditTotal = debtsOwedToMe.reduce((acc: number, debt: any) => {
    if (debt.totalValueOfDebt) {
      return acc + debt.totalValueOfDebt;
    }
    return acc;
  }, 0);
  const debtTotal = totalDebtArray.reduce((acc: any, debt: any) => {
    if (debt.total) {
      return acc + debt.total;
    }
    return acc;
  }, 0);

  // const refundArray = users.users[id].map((user: any) => {
  //   user;
  // });
  const myRefundArray = Object.keys(users.users[id])
    .filter((prop: string) => prop.startsWith("to"))
    .map((prop) => users.users[id][prop])
    .map((tab) => tab[0]);

  const myTotalRefund = myRefundArray.reduce((acc: any, refund: any) => {
    return acc + refund.refund;
  }, 0);

  const usersRefundArray = users.users.map((objet) => objet["to" + name] || [{ refund: 0 }]);

  const totalUsersRefund = usersRefundArray.reduce((acc, refund) => {
    console.log(refund[0]);
    return acc + refund[0].refund;
  }, 0);

  const allRefundResult = myTotalRefund - totalUsersRefund;
  const totalBalance = parseFloat((creditTotal - debtTotal + allRefundResult).toFixed(2));

  console.log(totalUsersRefund, usersRefundArray, totalBalance, "la somme ici");

  const handleToggleRefundModale = (toRefund: string, debt: number) => {
    setToggleRefundForm(!toggleRefundForm);
    setUserToRefund(toRefund);
    setDebtAmount(debt);
  };
  const handleValueToRefund = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueToRefund(e.target.value);
  };
  const handleRefund = (e: SyntheticEvent) => {
    e.preventDefault();
    // if (debtAmount >= users.users[id]["to" + userToRefund][0].refund + parseFloat(valueToRefund)) {
    console.log(users.users[id]["to" + userToRefund][0].refund);
    const currentDate = new Date();
    const date = currentDate.toISOString().split("T")[0];
    dispatch(addRefund({ id: id, valueToRefund: parseFloat(valueToRefund), userRefund: userToRefund, from: name, date: date }));
    setToggleRefundForm(false);
    // }
  };
  return (
    <div>
      {toggleDeleteUser && <DeleteUser name={name} setToggleDelete={setToggleDeleteUser} />}
      {togglePaymentForm && <PaymentForm name={name} id={id} setTogglePaymentForm={setTogglePaymentForm} />}
      {toggleRefundForm && (
        <div className={styles["modale-refund-container"]}>
          {
            <div className={styles["modale-refund"]}>
              {/* <button className={styles["close-modale-btn"]} onClick={() => setToggleRefundForm(!toggleRefundForm)}>
                X
              </button> */}
              <h3>You want to make a refund :</h3>
              <form>
                <label htmlFor="number">Amount to refund:</label>
                <input type="number" id="number" value={valueToRefund} placeholder="0" autoFocus onChange={handleValueToRefund} />
                {/* <button type="submit" className={styles["btn-refund"]} onClick={handleRefund}>
                  Refund
                </button> */}
                <div className={styles["btns-modale-container"]}>
                  <button type="button" className={styles.no} onClick={() => setToggleRefundForm(!toggleRefundForm)}>
                    No
                  </button>
                  <button type="submit" className={styles.yes} onClick={handleRefund}>
                    Yes
                  </button>
                </div>
              </form>
            </div>
          }
        </div>
      )}

      <div className={styles["plus-container"]}>
        <div className={styles["title-container"]}>
          <h3>
            {/* {name} Total : <span className={styles.positive}>{(creditTotal - debtTotal).toFixed(2)}</span> */}
            Dashboard: {name}
          </h3>
          <Link href={"/"}>
            <Image src={HomeIcon} alt="home icon" />
          </Link>
        </div>
        <div className={styles["total-container"]}>
          <p>Your total balance:</p>
          <span className={totalBalance > 0 ? styles.positive : totalBalance < 0 ? styles.negative : ""}>{totalBalance}</span>
        </div>
        <div className={styles["debt-container"]}>
          {/* <Transaction name={name} /> */}
          <h3>Balance details:</h3>
          <div>
            <ul>
              {totalDebtArray.map((result, index) => {
                const debtDifference = result.total - debtsOwedToMe[index].totalValueOfDebt;

                console.log(debtDifference, "ici");
                const user = users.users.filter((el) => el.name === result.name);
                const debtResult = isNaN(debtDifference) ? null : debtDifference - users.users[id]["to" + result.name][0].refund;
                console.log(users.users[user[0]?.id], "regarde la");
                const creditresult = isNaN(debtDifference) ? null : debtDifference + users.users[user[0]?.id]["to" + name][0]?.refund;
                // const creditresult = 2;
                console.log(creditresult, debtResult, "credit et dette ");

                if (isNaN(debtDifference)) {
                  return null;
                }

                return (
                  <li key={index} className={styles["user-card"]}>
                    {<span>{`${result.name} :  `}</span>}

                    {debtDifference > 0 && debtResult !== 0 ? "je doit:" + " " + debtResult?.toFixed(2) : " "}
                    <p> {debtDifference < 0 && creditresult !== 0 ? "me doit:" + " " + creditresult.toFixed(2) : " "}</p>
                    {(creditresult && debtResult) === 0 && " 0"}

                    {debtDifference - users.users[id]["to" + result.name][0].refund > 0 && (
                      <button onClick={() => handleToggleRefundModale(result.name, debtDifference)} className={styles["btn-refund"]}>
                        Refund
                      </button>
                    )}
                    {debtResult !== null && debtResult > 0 && "salut la compagnie"}
                    {debtResult}
                    {creditresult}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={styles["btns-container"]}>
          <div className={styles["btn-transation"]}>
            <p>see all my transaction</p>
          </div>
          <div className={styles["btn-delete"]} onClick={() => setToggleDeleteUser(!toggleDeleteUser)}>
            <p>Delete user</p>
            <Image src={DeleteIcon} alt="delete icon"></Image>
          </div>
          <div className={styles["btn-payment"]} onClick={() => setTogglePaymentForm(!togglePaymentForm)}>
            <p>Make payment</p>
            <Image src={PaymentIcon} alt="payment icon"></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
