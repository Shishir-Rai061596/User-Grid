import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import UserReducer from "../features/User/UserSlice";
import rootSaga from "../features/RootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    users: UserReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
