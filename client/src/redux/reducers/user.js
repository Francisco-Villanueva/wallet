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

      case actionTypes.CREATE_USER:{
        return {
          ...state,
          users: [...state.users, actionPayload],
        };
      }
  }
  return state;
};
