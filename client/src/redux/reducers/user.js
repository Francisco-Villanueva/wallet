export const intialState = {
  users: [],
  spents: [],
  types:[],
  wallets:[]
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

      case actionTypes.GET_SPENTS:
        return {
          ...state,
          spents: actionPayload,  
        };

      case actionTypes.GET_TYPES:{
        return {
          ...state,
          types: actionPayload,
        };
      }

      case actionTypes.GET_WALLETS:{
        return {
          ...state,
          wallets: actionPayload,
        };
      }
  }
  return state;
};
