import { createContext, useReducer } from "react";
import { intialState, reducer } from "../reducers/user";
import Swal from "sweetalert2";
import axios from "axios";
export const actionTypes = {
  GET_USERS: "GET_USERS",
  CREATE_USER: 'CREATE_USER',
  GET_SPENTS: "GET_SPENTS",
  GET_TYPES: "GET_TYPES",
  GET_WALLETS: "GET_WALLETS",
  GET_SPENTS_BY_TYPES: "GET_SPENTS_BY_TYPES",
  DELETE_SPENTS: "DELETE_SPENTS",
  SET_USER_ACTUAL: "SET_USER_ACTUAL",
  GET_USER_DATA: "GET_USER_DATA",
};

export const UserContext = createContext();

function useUsersReducer() {
  const [state, dispatch] = useReducer(reducer, intialState);

  console.log("STATE: ", state);
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/users");

      // console.log("entro al getUsers(): ", res.data);
      dispatch({
        type: actionTypes.GET_USERS,
        payload: res.data,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const createUser = async (userData) => {
    try {
      const newUser = await axios.post("http://localhost:4000/users", userData);

      console.log('USER CREATED: ', newUser.data);


      Swal.fire({
        icon: "success",
        title: "User created!",
        // text: "Check username submited",
      });

      dispatch({
        type: actionTypes.CREATE_USER,
        payload: newUser.data,
      });

    } catch (error) {
      console.log({ error })
    }

  }

  const getAllSpents = async () => {
    try {
      const res = await axios.get("http://localhost:4000/spent");

      dispatch({
        type: actionTypes.GET_SPENTS,
        payload: res.data,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  const getAllWallets = async () => {
    try {
      const res = await axios.get("http://localhost:4000/wallet");

      console.log('ENTRO AL getWallets() ', res.data)
      dispatch({
        type: actionTypes.GET_WALLETS,
        payload: res.data,
      })

    } catch (error) {
     console.log({error}) 
    }
  }

  const getTypes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/types");
      dispatch({
        type: actionTypes.GET_TYPES,
        payload: res.data,
      })
    } catch (error) {
      console.log({ error });
    }
  }

  return { state, getUsers, createUser, getAllSpents, getTypes,  getAllWallets};
}
export function UsersProvider({ children }) {
  const { state, getUsers, createUser, getTypes , getAllSpents, getAllWallets} = useUsersReducer();

  return (
    <UserContext.Provider value={{ users: state.users,allSpents: state.spents,types: state.types , allWallets: state.wallets,getUsers, createUser, getAllSpents , getTypes, getAllWallets}}>
      {children}
    </UserContext.Provider>
  );

}
