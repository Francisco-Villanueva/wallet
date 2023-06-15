export const intialState = {
  users: [],
  spents: [],
  types: [],
  wallets: [],
  typesByUser: [],
  currentUser: null,
};
import { actionTypes } from "../context/user";
export const reducer = (state = intialState, action) => {
  const { type: actionType, payload: actionPayload } = action;
  switch (actionType) {
    case actionTypes.GET_USERS:
      return {
        ...state,
        users: actionPayload,
      };

    case actionTypes.CREATE_USER: {
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

    case actionTypes.GET_TYPES: {
      return {
        ...state,
        types: actionPayload,
      };
    }

    case actionTypes.GET_WALLETS: {
      return {
        ...state,
        wallets: actionPayload,
      };
    }
    case actionTypes.GET_USER_BY_ID: {
      return {
        ...state,
        currentUser: actionPayload,
      };
    }

    case actionTypes.GET_TYPES_BY_USER: {
      return {
        ...state,
        typesByUser: state.typesByUser.concat(actionPayload),
      };
    }
    case actionTypes.CREATE_SPENT: {
      return {
        ...state,
        spents: [...state.spents, actionPayload],
      };
    }

    case actionTypes.DELETE_SPENTS: {
      return {
        ...state,
        spents: state.spents.filter((spent) => spent.spentId !== actionPayload),
      };
    }
  }
  return state;
};
