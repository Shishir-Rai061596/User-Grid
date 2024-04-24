import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../interfaces";
import { ERROR_MESSAGE } from "../../constants";

const initialUserState: UserState = {
  loading: false,
  users: [],
  error: "",
};

const UserSlice = createSlice({
  name: "User",
  initialState: initialUserState,
  reducers: {
    USERLIST_FETCH_REQUEST_LOADING: state => {
      state.loading = true;
    },
    USERLIST_FETCH_REQUEST_SUCCEEDED: (state, action) => {
      state.users = action.payload;
    },
    USERLIST_FETCH_REQUEST_FAILED: state => {
      state.error = ERROR_MESSAGE;
    },
    USERLIST_FETCH_REQUEST_COMPLETED: state => {
      state.loading = false;
    },
    USERLIST_DELETE: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    USERLIST_LOCATION_UPDATE: (state, { payload }) => {
      state.users = state.users.map(user =>
        user.id === payload.id
          ? { ...user, location: payload.newLocation }
          : user
      );
    },
  },
});

export default UserSlice.reducer;
export const {
  USERLIST_FETCH_REQUEST_LOADING,
  USERLIST_FETCH_REQUEST_SUCCEEDED,
  USERLIST_FETCH_REQUEST_FAILED,
  USERLIST_FETCH_REQUEST_COMPLETED,
  USERLIST_DELETE,
  USERLIST_LOCATION_UPDATE,
} = UserSlice.actions;
