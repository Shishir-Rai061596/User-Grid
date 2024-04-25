import { all } from "redux-saga/effects";
import {
  userListSaga,
  userDeleteSaga,
  userLocationUpdateSage,
} from "./User/UserSaga";
function* rootSaga() {
  yield all([userListSaga(), userDeleteSaga(), userLocationUpdateSage()]);
}

export default rootSaga;
