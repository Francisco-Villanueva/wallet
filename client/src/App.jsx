import { useEffect, useState } from "react";
import "./App.css";
import { useUsers } from "./hooks/useUsers";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/Register/Register";

function App() {
  const { users, getUsers } = useUsers();

  useEffect(() => {
    getUsers();
  }, []);

  console.log(users);
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register users={users} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
