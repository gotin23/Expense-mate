// import { configureStore } from "@reduxjs/toolkit";
// import usersReducer from "./reducers/usersReducer";

// const store = configureStore({
//   reducer: {
//     user: usersReducer,
//   },
// });

// export default store;
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/usersReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Créez une configuration pour Redux Persist
const persistConfig = {
  key: "root", // Clé sous laquelle l'état sera stocké dans le stockage local
  storage,
};

// Créez un réducteur persistant en utilisant votre réducteur existant
const persistedReducer = persistReducer(persistConfig, usersReducer);

// Créez le magasin Redux
const store = configureStore({
  reducer: {
    user: persistedReducer, // Utilisez le réducteur persistant au lieu de usersReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };
