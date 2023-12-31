import { createContext, useReducer } from "react";
import { intialState, reducer } from "../reducers/user";
import Swal from "sweetalert2";
import axios from "axios";
export const actionTypes = {
  GET_USERS: "GET_USERS",
  GET_USER_BY_ID: "GET_USER_BY_ID",
  GET_SPENTS: "GET_SPENTS",
  GET_TYPES: "GET_TYPES",
  CREATE_TYPES : "CREATE_TYPES",
  GET_TYPES_BY_USER: "GET_TYPES_BY_USER",
  GET_WALLETS: "GET_WALLETS",
  GET_SPENTS_BY_TYPES: "GET_SPENTS_BY_TYPES",
  CREATE_USER: "CREATE_USER",
  CREATE_SPENT: "CREATE_SPENT",
  DELETE_SPENTS: "DELETE_SPENTS",
  GET_USER_DATA: "GET_USER_DATA",
};

export const UserContext = createContext();

function useUsersReducer() {
  const [state, dispatch] = useReducer(reducer, intialState);

  const clearLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
  };
  const updateLocalStorage = (user, id) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userId", JSON.stringify(id));
  };
  // console.log("STATE: ", state);
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

  const getUserById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/users/${id}`);
      updateLocalStorage(res.data, res.data.userId);

      dispatch({
        type: actionTypes.GET_USER_BY_ID,
        payload: res.data,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const createUser = async (userData) => {
    try {
      const newUser = await axios.post("http://localhost:4000/users", userData);

      // console.log("USER CREATED: ", newUser.data);

      Swal.fire({
        icon: "success",
        title: "User created!",
        timer: 1000
        // text: "Check username submited",
      });

      dispatch({
        type: actionTypes.CREATE_USER,
        payload: newUser.data,
      });
    } catch (error) {
      console.log({ error });
    }
  };

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
  };

  const getAllWallets = async () => {
    try {
      const res = await axios.get("http://localhost:4000/wallet");

      // console.log('ENTRO AL getWallets() ', res.data)
      dispatch({
        type: actionTypes.GET_WALLETS,
        payload: res.data,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const getTypes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/types");
      dispatch({
        type: actionTypes.GET_TYPES,
        payload: res.data,
      });
    } catch (error) {
      console.log({ error });
    }
  };
 const createTypes = async (typeData)=>{
  try {
    const res = await axios.post("http://localhost:4000/types", typeData)

    Swal.fire({
      icon: "success",
        title: "Type created!",
        timer: 1000
    }
    )
    dispatch({
      type: actionTypes.CREATE_TYPES,
      payload : res.data
    })
  } catch (error) {
    console.log({ error });
    
  }
 }
  const getTypesByUser = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/types/${id}`);
      const user = await axios.get(`http://localhost:4000/users/${id}`);
      updateLocalStorage(user.data, user.data.userId);
      dispatch({
        type: actionTypes.GET_TYPES_BY_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const createSpent = async (spentData) => {
    try {
      const newSpent = await axios.post(
        "http://localhost:4000/spent",
        spentData
      );

      Swal.fire({
        icon: "success",
        title: "Spent created!",
        // text: "Check username submited",
        timer: 500,
      });

      dispatch({
        type: actionTypes.CREATE_SPENT,
        payload: newSpent.data,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteSpent = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/spent/${id}`);

      Swal.fire({
        icon: "success",
        title: "Spent deleted!",
        // text: "Check username submited",
        timer: 500,
      });

      dispatch({
        type: actionTypes.DELETE_SPENTS,
        payload: res.data,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const setWalletBalance = async (id, amount) => {
    try {
      await axios.put(`http://localhost:4000/wallet/${id}`, {
        amount,
      });

      Swal.fire({
        icon: "success",
        title: "Wallet updated!",
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const storeUser = JSON.parse(localStorage.getItem("user"));
  const storeUserId = JSON.parse(localStorage.getItem("userId"));
  return {
    state,
    getUsers,
    createUser,
    getAllSpents,
    getTypes,
    getAllWallets,
    getUserById,
    getTypesByUser,
    createSpent,
    createTypes,
    deleteSpent,
    setWalletBalance,
    storeUser,
    storeUserId,
    clearLocalStorage,
  };
}
export function UsersProvider({ children }) {
  const {
    state,
    getUsers,
    createUser,
    getTypes,
    getAllSpents,
    getAllWallets,
    getUserById,
    getTypesByUser,
    createSpent,
    deleteSpent,
    createTypes,
    storeUser,
    storeUserId,
    setWalletBalance,
    clearLocalStorage,
  } = useUsersReducer();

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        currentUser: state.currentUser,
        allSpents: state.spents,
        types: state.types,
        typesByUser: state.typesByUser,
        allWallets: state.wallets,
        getUsers,
        createUser,
        getAllSpents,
        getTypes,
        getAllWallets,
        getUserById,
        createTypes,
        getTypesByUser,
        createSpent,
        deleteSpent,
        storeUser,
        storeUserId,
        setWalletBalance,
        clearLocalStorage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
