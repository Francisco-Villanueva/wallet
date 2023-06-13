import { useEffect, useState } from "react";
import "./App.css";
import { useUsers } from "./hooks/useUsers";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";

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
        </Routes>
      </div>
    </>
  );
}

export default App;
