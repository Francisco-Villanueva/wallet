import { createContext, useReducer } from "react";
import { intialState, reducer } from "../reducers/user";
import axios from "axios";
export const actionTypes = {
  GET_USERS: "GET_USERS",
  GET_SPENTS: "GET_SPENTS",
  GET_SPENTS_BY_TYPES: "GET_SPENTS_BY_TYPES",
  DELETE_SPENTS: "DELETE_SPENTS",
  SET_USER_ACTUAL: "SET_USER_ACTUAL",
  GET_WALLETS: "GET_WALLETS",
  GET_USER_DATA: "GET_USER_DATA",
};

export const UserContext = createContext();

function useUsersReducer() {
  const [state, dispatch] = useReducer(reducer, intialState);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/users");

      console.log("entro al getUsers(): ", res.data);
      dispatch({
        type: actionTypes.GET_USERS,
        payload: res.data,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return { state, getUsers };
}

export function UsersProvider({ children }) {
  const { state, getUsers } = useUsersReducer();

  return (
    <UserContext.Provider value={{ users: state, getUsers }}>
      {children}
    </UserContext.Provider>
  );
}
