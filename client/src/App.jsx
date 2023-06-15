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
    storeUser,
    allWallets,
    allSpents,
    types,
    getUsers,
    getAllWallets,
    getAllSpents,
    getTypes,
    getUserById,
    getTypesByUser,
    storeUserId
  } = useUsers();
  const [currentUser, setCurrentUser] = useState(storeUser);

  useEffect(() => {
    getUsers();
    getAllWallets();
    getAllSpents();
    getTypes();
    getTypesByUser(currentUser?.userId)
  }, []);

  useEffect(() => {
    setCurrentUser(storeUser);
  }, [currentUser, allSpents, typesByUser]);


  // const [currentUser, setUserLoged] = useState(JSON.parse(storeser));
 

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
