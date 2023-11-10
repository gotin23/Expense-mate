// import React from "react";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../Types/types";
// import UserCard from "../../components/UserCard/UserCard";
// import styles from "../styles/MyGroup.module.css";
// import AllTransactions from "../../components/AllTransactions/AllTransactions";

// export default function MyGroup() {
//   const users = useSelector((state: RootState) => state.user);
//   const [toggleAllTransactions, setToggleAllTransactions] = useState(false);

//   const handleToggleAllTransactions = () => {
//     setToggleAllTransactions(!toggleAllTransactions);
//   };

//   return (
//     <div className={styles.container}>
//       <button type="button" className={styles["btn-all-transactions"]} onClick={handleToggleAllTransactions}>
//         {toggleAllTransactions ? "All transactions" : "Back"}
//       </button>
//       {toggleAllTransactions ? (
//         <div className={styles["my-group-container"]}>
//           {users.users.map((user) => (
//             <UserCard key={user.id} props={user} />
//           ))}
//         </div>
//       ) : (
//         <AllTransactions />
//       )}
//     </div>
//   );
// }
