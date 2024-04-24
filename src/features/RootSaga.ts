import { all } from "redux-saga/effects";
import { userListSaga } from "./User/UserSaga";
function* rootSaga() {
  yield all([userListSaga()]);
}

export default rootSaga;
