import React from "react";
import styles from "../../../src/styles/DashBoard.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Types/types";
import Transaction from "../../../components/Transaction/Transaction";
import PaymentForm from "../../../components/PaymentForm/PaymentForm";
import DeleteUser from "../../../components/DeleteUser/DeleteUser";
import DeleteIcon from "../../../public/assets/icons/delete-4-svgrepo-com.svg";
import PaymentIcon from "../../../public/assets/icons/Euro Banknote.svg";
import HomeIcon from "../../../public/assets/icons/Home Icon.svg";
import TransactionIcon from "../../../public/assets/icons/Transaction Icon.svg";
import BalanceIcon from "../../../public/assets/icons/Account Icon.svg";
// import { useRouter } from "next/router";
import Link from "next/link";
import Balance from "../../../components/Balance/Balance";

export default function Dashboard() {
  const users = useSelector((state: RootState) => state.user);
  // const router = useRouter();
  const URL = window.location.pathname;
  const endURL = URL.split("/");
  const name = endURL[endURL.length - 1];
  const onUser = users.users.filter((el) => el.name === name);

  // const router = useRouter();
  // // Récupérez le chemin de l'URL actuelle
  // const currentPath = router.asPath;
  // // Trouvez le dernier index du caractère '/' dans le chemin de l'URL
  // const lastIndex = currentPath.lastIndexOf("/");
  // // Récupérez tout ce qui se trouve après le dernier '/'
  // const name = lastIndex !== -1 ? currentPath.slice(lastIndex + 1) : "";
  // const onUser = users.users.filter((el) => el.name === name);
  // const id = onUser[0].id;
  // useEffect(() => {
  //   if (onUser.length === 0) {
  //     console.log(onUser, name, "onrentre dans le useEffect", router);
  //     router.push("/");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // console.log(router, name);

  const id = onUser[0]?.id;

  const dispatch = useDispatch();
  const [toggleRefundForm, setToggleRefundForm] = useState(false);
  const [toggleDeleteUser, setToggleDeleteUser] = useState(false);
  const [togglePaymentForm, setTogglePaymentForm] = useState(false);
  const [userToRefund, setUserToRefund] = useState("");
  const [valueToRefund, setValueToRefund] = useState("");
  const [debtAmount, setDebtAmount] = useState(0);
  const [switchTransactionBalance, setSwitchTransactionBalance] = useState(false);

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
  console.log(debtsOwedToMe, totalDebtArray, " icicicici");

  const myRefundArray =
    users.users[id] &&
    Object.keys(users.users[id])
      .filter((prop: string) => prop.startsWith("to"))
      .map((prop) => users.users[id][prop])
      .map((tab) => tab[0]);

  const myTotalRefund = myRefundArray?.reduce((acc: any, refund: any) => {
    return acc + refund.refund;
  }, 0);

  const usersRefundArray = users.users.map((objet) => objet["to" + name] || [{ refund: 0 }]);

  const totalUsersRefund = usersRefundArray.reduce((acc, refund) => {
    return acc + refund[0].refund;
  }, 0);

  const allRefundResult = myTotalRefund - totalUsersRefund;
  const totalBalance = parseFloat((creditTotal - debtTotal + allRefundResult).toFixed(2));

  return (
    <>
      {togglePaymentForm && <PaymentForm name={name} id={id} setTogglePaymentForm={setTogglePaymentForm} />}

      <div className={styles["plus-container"]}>
        {toggleDeleteUser && <DeleteUser name={name} setToggleDelete={setToggleDeleteUser} />}
        <div className={styles["title-container"]}>
          <h3>Dashboard: {name}</h3>
          <Link href={"/"}>
            <Image src={HomeIcon} alt="home icon" />
          </Link>
        </div>
        <div className={styles["total-container"]}>
          <p>Your total balance:</p>
          <span className={totalBalance > 0 ? styles.positive : totalBalance < 0 ? styles.negative : ""}>{totalBalance}</span>
        </div>

        {switchTransactionBalance && <Transaction name={name} />}
        {!switchTransactionBalance && <Balance name={name} id={id} />}

        <div className={styles["btns-container"]}>
          <div className={styles["btn-delete"]} onClick={() => setToggleDeleteUser(!toggleDeleteUser)}>
            <p>Delete</p>
            <Image src={DeleteIcon} alt="delete icon"></Image>
          </div>
          <div className={styles["btn-transation"]} onClick={() => setSwitchTransactionBalance(!switchTransactionBalance)}>
            <p>{!switchTransactionBalance ? "Transactions" : "Balance"}</p>
            <Image src={!switchTransactionBalance ? TransactionIcon : BalanceIcon} alt={!switchTransactionBalance ? "Transactions" : "Balance"}></Image>
          </div>
          <div className={styles["btn-payment"]} onClick={() => setTogglePaymentForm(!togglePaymentForm)}>
            <p>Payment</p>
            <Image src={PaymentIcon} alt="payment icon"></Image>
          </div>
        </div>
      </div>
    </>
  );
}
