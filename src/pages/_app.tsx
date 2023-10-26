import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import Navbar from "../../components/Navbar/Navbar";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import styles from "../styles/Home.module.css";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={styles["all-content"]}>
          <Component {...pageProps} />
        </div>
      </PersistGate>
    </Provider>
  );
}
