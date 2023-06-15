import { useEffect, useState } from "react";
import "./App.css";
import { useUsers } from "./hooks/useUsers";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Allspents from "./components/Home/Gastos/AllSpents/Allspents";
import Wallet from "./components/Wallet/Wallet";

function App() {
  const {
    users,
    typesByUser,
    allWallets,
    allSpents,
    types,
    getUsers,
    getAllWallets,
    getAllSpents,
    getTypes,
  } = useUsers();

  useEffect(() => {
    getUsers();
    getAllWallets();
    getAllSpents();
    getTypes();
  }, []);

  const storedUser = localStorage.getItem("currentUser");
  console.log({storedUser});
  const [currentUser, setUserLoged] = useState(storedUser !== 'undefined'? JSON.parse(storedUser): storedUser);
  useEffect(() => {
    // Obtener currentUser almacenado en el Local Storage
    // console.log('LOCAL STORAGE: ',JSON.parse(storedUser));
    if (storedUser !== 'undefined') {
      setUserLoged(JSON.parse(storedUser));
    }
  }, [users]);

  console.log({currentUser});
 

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login listOfUsers={users} />} />
          <Route path="/register" element={<Register users={users} />} />
          <Route
            path="/home"
            element={
              <Home wallets={allWallets} types={types} allSpents={allSpents} currentUser={currentUser}/>
            }
          />
          <Route
            path="/allSpents/:idType"
            element={<Allspents typesByUser={typesByUser} />}
          />
          <Route path="/wallet" element={<Wallet currentUser={currentUser}/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
