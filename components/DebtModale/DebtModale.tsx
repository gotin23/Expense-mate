// import React, { SyntheticEvent } from "react";
// import styles from "../../src/styles/DebtModale.module.css";
// import Image from "next/image";
// import { useState, ChangeEvent } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../Types/types";
// import { ModaleDebtProps } from "../../Types/types";
// import { addRefund } from "../../src/redux/reducers/usersReducer";
// import Transaction from "../Transaction/Transaction";
// import PaymentForm from "../../components/PaymentForm/PaymentForm";
// import DeleteUser from "../../components/DeleteUser/DeleteUser";
// import BackLogo from "../../public/assets/icons/Back.svg";
// import DeleteIcon from "../../public/assets/icons/delete-4-svgrepo-com.svg";
// import PaymentIcon from "../../public/assets/icons/wallet-money-cash-svgrepo-com.svg";

// export default function DebtModale({ id, name, setToggle }: ModaleDebtProps) {
//   const users = useSelector((state: RootState) => state.user);
//   const dispatch = useDispatch();
//   const [toggleRefundForm, setToggleRefundForm] = useState(false);
//   const [toggleDeleteUser, setToggleDeleteUser] = useState(false);
//   const [togglePaymentForm, setTogglePaymentForm] = useState(false);
//   const [userToRefund, setUserToRefund] = useState("");
//   const [valueToRefund, setValueToRefund] = useState("");
//   const [debtAmount, setDebtAmount] = useState(0);
//   const [total, setTotal] = useState(0);
//   console.log(users);

//   type TransactionItem = {
//     type: string;
//     valueOfDebt: number;
//   };
//   const names: string[] = users.users.map((user) => user.name);
//   const totalDebt = names.map((arrayName) => {
//     const array = users.users[id]["to" + arrayName];
//     const total = array?.reduce((accumulator: number, item: TransactionItem) => {
//       if (item.valueOfDebt) {
//         return accumulator + item.valueOfDebt;
//       }
//       return accumulator;
//     }, 0);
//     return { name: arrayName, total };
//   });
//   interface DebtItem {
//     valueOfDebt: number;
//   }
//   const debtsOwedToMe = users.users.map((user) => {
//     if (user["to" + name] && Array.isArray(user["to" + name])) {
//       const totalValueOfDebt = user["to" + name].reduce((accumulator: number, item: DebtItem) => {
//         if (item.valueOfDebt) {
//           return accumulator + item.valueOfDebt;
//         }
//         return accumulator;
//       }, 0);
//       return { name: user.name, totalValueOfDebt };
//     } else {
//       return { name: user.name, totalValueOfDebt: 0 };
//     }
//   });

//   const creditTotal = debtsOwedToMe.reduce((acc: number, debt: any) => {
//     console.log(acc, "iciicicici", debt);
//     if (debt.totalValueOfDebt) {
//       return acc + debt.totalValueOfDebt;
//     }
//     return acc;
//   }, 0);
//   const debtTotal = totalDebt.reduce((acc: any, debt: any) => {
//     console.log(acc, "iciicicici", debt);
//     if (debt.total) {
//       return acc + debt.total;
//     }
//     return acc;
//   }, 0);

//   console.log(typeof debtTotal, "la", typeof creditTotal);
//   const handleToggleRefundModale = (toRefund: string, debt: number) => {
//     setToggleRefundForm(!toggleRefundForm);
//     setUserToRefund(toRefund);
//     setDebtAmount(debt);
//   };
//   const handleValueToRefund = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setValueToRefund(e.target.value);
//   };
//   const handleRefund = (e: SyntheticEvent) => {
//     e.preventDefault();
//     if (debtAmount >= users.users[id]["to" + userToRefund][0].refund + parseFloat(valueToRefund)) {
//       console.log(users.users[id]["to" + userToRefund][0].refund);
//       const currentDate = new Date();
//       const date = currentDate.toISOString().split("T")[0];
//       dispatch(addRefund({ id: id, valueToRefund: parseFloat(valueToRefund), userRefund: userToRefund, from: name, date: date }));
//       setToggleRefundForm(false);
//     }
//   };

//   return (
//     <>
//       {toggleDeleteUser && <DeleteUser name={name} setToggle={setToggle} setToggleDelete={setToggleDeleteUser} />}
//       {togglePaymentForm && <PaymentForm name={name} id={id} setToggle={setToggle} setTogglePaymentForm={setTogglePaymentForm} />}

//       <div className={styles["plus-container"]}>
//         <div className={styles["total-container"]}>
//           <h3>
//             {/* {name} Total : <span className={styles.positive}>{(creditTotal - debtTotal).toFixed(2)}</span> */}
//             DashBoard
//           </h3>
//           <Image src={BackLogo} alt="back icon" onClick={() => setToggle(false)}></Image>
//         </div>
//         <div className={styles["debt-container"]}>
//           {/* <Transaction name={name} /> */}
//           <h3>Balance details:</h3>
//           <div>
//             <ul>
//               {totalDebt.map((result, index) => {
//                 const debtDifference = result.total - debtsOwedToMe[index].totalValueOfDebt;

//                 console.log(debtDifference, "ici");
//                 const user = users.users.filter((el) => el.name === result.name);
//                 const debtResult = isNaN(debtDifference) ? null : debtDifference - users.users[id]["to" + result.name][0].refund;
//                 const creditresult = isNaN(debtDifference) ? null : debtDifference + users.users[user[0].id]["to" + name][0].refund;

//                 console.log(creditresult, debtResult, "credit et dette ");

//                 if (isNaN(debtDifference)) {
//                   return null;
//                 }

//                 return (
//                   <li key={index} className={styles["user-card"]}>
//                     {<span>{`${result.name} :  `}</span>}

//                     {debtDifference > 0 && debtResult !== 0 ? "je doit:" + " " + debtResult?.toFixed(2) : " "}
//                     <p> {debtDifference < 0 && creditresult !== 0 ? "me doit:" + " " + creditresult.toFixed(2) : " "}</p>
//                     {(creditresult && debtResult) === 0 && " 0"}

//                     {debtDifference - users.users[id]["to" + result.name][0].refund > 0 && (
//                       <button onClick={() => handleToggleRefundModale(result.name, debtDifference)} className={styles["btn-refund"]}>
//                         Refund
//                       </button>
//                     )}
//                     {debtResult !== null && debtResult > 0 && "salut la compagnie"}
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </div>
//         <div className={styles["btns-container"]}>
//           <div className={styles["btn-transation"]}>
//             <p>see all my transaction</p>
//           </div>
//           <div className={styles["btn-delete"]} onClick={() => setToggleDeleteUser(!toggleDeleteUser)}>
//             <p>Delete user</p>
//             <Image src={DeleteIcon} alt="delete icon"></Image>
//           </div>
//           <div className={styles["btn-payment"]} onClick={() => setTogglePaymentForm(!togglePaymentForm)}>
//             <p>Make payment</p>
//             <Image src={PaymentIcon} alt="payment icon"></Image>
//           </div>
//         </div>
//         {/* {toggleRefundForm && (
//         <div className={styles["modale-refund-container"]}>
//           {
//             <div className={styles["modale-refund"]}>
//               <button className={styles["close-modale-btn"]} onClick={() => setToggleRefundForm(!toggleRefundForm)}>
//                 X
//               </button>
//               <form>
//                 <label htmlFor="number">Amount to refund:</label>
//                 <input type="number" id="number" value={valueToRefund} onChange={handleValueToRefund} />
//                 <button type="submit" className={styles["btn-refund"]} onClick={handleRefund}>
//                   Refund
//                 </button>
//               </form>
//             </div>
//           }
//         </div>
//       )}
//       <div className={styles["modale-container"]}>
//         <div className={styles.modale}>
//           <button type="button" className={styles["btn-toggle-modale"]} onClick={() => setToggle(false)}>
//             X
//           </button>
//           <h2>Debt Dashboard:</h2>
//           {names.length > 1 ? (
//             <ul>
//               {totalDebt.map((result, index) => {
//                 const debtDifference = result.total - debtsOwedToMe[index].totalValueOfDebt;
//                 const user = users.users.filter((el) => el.name === result.name);
//                 const debtResult = isNaN(debtDifference) ? null : debtDifference - users.users[id]["to" + result.name][0].refund;
//                 const creditresult = isNaN(debtDifference) ? null : debtDifference + users.users[user[0].id]["to" + name][0].refund;

//                 if (isNaN(debtDifference)) {
//                   return null;
//                 }

//                 return (
//                   <li key={index} className={styles["user-card"]}>
//                     {<span>{`${result.name} :  `}</span>}

//                     {debtDifference > 0 && debtResult !== 0 ? "Debt:" + " " + debtResult?.toFixed(2) : " "}
//                     {debtDifference < 0 && creditresult !== 0 ? "Credit:" + " " + creditresult.toFixed(2) : " "}
//                     {(creditresult && debtResult) === 0 && " 0"}

//                     {debtDifference - users.users[id]["to" + result.name][0].refund > 0 && (
//                       <button onClick={() => handleToggleRefundModale(result.name, debtDifference)} className={styles["btn-refund"]}>
//                         Refund
//                       </button>
//                     )}
//                   </li>
//                 );
//               })}
//             </ul>
//           ) : (
//             <p>Not enought user in the group!</p>
//           )}
//         </div>
//       </div> */}
//       </div>
//     </>
//   );
// }
