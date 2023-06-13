export const intialState = {
  users: [],
};
import { actionTypes } from "../context/user";
export const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;
  switch (actionType) {
    case actionTypes.GET_USERS:
      return {
        ...state,
        users: actionPayload,
      };
  }
  return state;
};
