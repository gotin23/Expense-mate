import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../../components/Navbar/Navbar";
import { Provider } from "react-redux";
import store from "@/redux/store";
import styles from "../styles/Home.module.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <div className={styles["all-content"]}>
          <Component {...pageProps} />
        </div>
      </Provider>
    </>
  );
}
