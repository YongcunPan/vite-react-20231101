import { configureStore, combineReducers } from "@reduxjs/toolkit";
import globalReducer from "./features/global/globalSlice";
import authReducer from "./features/auth/authSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// const store = configureStore({
//   reducer: {
//     global: globalReducer,
//     auth: authReducer,
//   },
// });

// -------------------持久化存储 redux---------------------
const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer,
});
const persistConfig = { key: "__root", storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persist = persistStore(store);
// -------------------持久化存储 redux---------------------
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
