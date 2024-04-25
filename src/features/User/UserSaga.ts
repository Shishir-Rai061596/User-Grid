import { takeLatest, put, call } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { GET_USERS } from "../../constants";
import {
  USERLIST_FETCH_REQUEST,
  USERLIST_DELETE_REQUEST,
  USERLIST_LOCATION_UPDATE_REQUEST,
} from "./UserActions";

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

function* deleteUser({ payload }: any) {
  try {
    const { id } = payload;
    yield call(axios.delete, `${GET_USERS}/${id}`);
  } catch (error) {
    console.log(error);
  }
}

function* updateLocation({ payload }: any) {
  try {
    const { id } = payload;

    yield call(axios.put, `${GET_USERS}/${id}`, payload);
  } catch (error) {
    console.log(error);
  }
}

export function* userListSaga() {
  yield takeLatest(USERLIST_FETCH_REQUEST, getUsers);
}

export function* userDeleteSaga() {
  yield takeLatest(USERLIST_DELETE_REQUEST, deleteUser);
}

export function* userLocationUpdateSage() {
  yield takeLatest(USERLIST_LOCATION_UPDATE_REQUEST, updateLocation);
}
