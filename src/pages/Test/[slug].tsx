import React, { SyntheticEvent } from "react";
import styles from "../../../src/styles/DebtModale.module.css";
import Image from "next/image";
import { useState, ChangeEvent, useEffect } from "react";
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

export default function Test() {
  const users = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const URL = window.location.pathname;
  const endURL = URL.split("/");

  // Le dernier élément du tableau est ce qui se trouve après le dernier '/'
  const name = endURL[endURL.length - 1];

  // Faites quelque chose avec le contenu récupéré
  const onUser = users.users.filter((el) => el.name === name);
  const id = onUser[0]?.id;
  console.log(router.query.slug, "leslug ici", router);
  const dispatch = useDispatch();
  const [toggleRefundForm, setToggleRefundForm] = useState(false);
  const [toggleDeleteUser, setToggleDeleteUser] = useState(false);
  const [togglePaymentForm, setTogglePaymentForm] = useState(false);
  const [userToRefund, setUserToRefund] = useState("");
  const [valueToRefund, setValueToRefund] = useState("");
  const [debtAmount, setDebtAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [switchTransactionBalance, setSwitchTransactionBalance] = useState(false);

  type TransactionItem = {
    type: string;
    valueOfDebt: number;
  };
  const names: string[] = users.users.map((user) => user.name);
  console.log(names);
  const totalDebtArray = names.map((arrayName) => {
    console.log(users.users[id]);
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
  // console.log(totalDebtArray.filter((item) => item.name !== name));
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

  const refundArray =
    users.users[id] &&
    users.users[id].map((user: any) => {
      user;
    });
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
    console.log(refund[0]);
    return acc + refund[0].refund;
  }, 0);

  const allRefundResult = myTotalRefund - totalUsersRefund;
  const totalBalance = parseFloat((creditTotal - debtTotal + allRefundResult).toFixed(2));

  // console.log(totalUsersRefund, usersRefundArray, totalBalance, "la somme ici");

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

  console.log(router);
  return (
    <div>
      <h2>hellloooo</h2>
    </div>
  );
}
