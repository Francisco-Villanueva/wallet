import { useEffect, useState } from "react";
import "./App.css";
import { useUsers } from "./hooks/useUsers";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";

function App() {
  const { users, allWallets,types, getUsers, getAllWallets ,getAllSpents, getTypes} = useUsers();

  useEffect(() => {
    getUsers();
    getAllWallets()
    getAllSpents()
    getTypes()
  }, []);


  // console.log({allWallets})

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login listOfUsers={users}/>} />
          <Route path="/register" element={<Register users={users} />} />
          <Route path="/home" element={<Home wallets={allWallets} types={types} />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
