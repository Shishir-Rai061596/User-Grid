import { takeLatest, put, call } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { GET_USERS } from "../../constants";
import { USERLIST_FETCH_REQUEST } from "./UserActions";

import {
  USERLIST_FETCH_REQUEST_LOADING,
  USERLIST_FETCH_REQUEST_SUCCEEDED,
  USERLIST_FETCH_REQUEST_FAILED,
  USERLIST_FETCH_REQUEST_COMPLETED,
} from "./UserSlice";

function* getUsers() {
  yield put(USERLIST_FETCH_REQUEST_LOADING());

  try {
    const { data }: AxiosResponse = yield call(axios, GET_USERS);
    yield put(USERLIST_FETCH_REQUEST_SUCCEEDED(data));
  } catch (error) {
    yield put(USERLIST_FETCH_REQUEST_FAILED());
  } finally {
    yield put(USERLIST_FETCH_REQUEST_COMPLETED());
  }
}

export function* userListSaga() {
  yield takeLatest(USERLIST_FETCH_REQUEST, getUsers);
}
