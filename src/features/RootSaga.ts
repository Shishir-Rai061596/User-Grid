import { all } from "redux-saga/effects";
import { userListSaga, userDeleteSaga } from "./User/UserSaga";
function* rootSaga() {
  yield all([userListSaga(), userDeleteSaga()]);
}

export default rootSaga;
