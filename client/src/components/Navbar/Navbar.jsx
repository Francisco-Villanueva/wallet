import React, { useState } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faUser,
  faUserCircle,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import User from "../User/User";
import { useUsers } from "../../hooks/useUsers";
import Settings from "../Settings/Settings";

// import User from "../User/User";
export default function NavBar({ currentUser, saldo }) {
  // console.log("ID QUE LLEGA AL NAVBAR", userId);

  const { typesByUser, types, createTypes } = useUsers();
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleShowUser = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  }

  const handleCloseSettings = () => {
    setShowSettings(false);
  }

  const navigation = useNavigate();

  return (
    <div className="navbar-main">
      <div className="navbar-logo" onClick={() => navigation(`/home`)}>
        <FontAwesomeIcon icon={faWallet} />
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".25rem",
          }}
        >
          <b>Wallet</b>
          <span style={{ fontSize: ".75rem" }}>app</span>
        </span>
      </div>

      <div className="navbar-links">
        <p
          onClick={() => {
            navigation(`/wallet`);
          }}
          className="navbar-links__p"
        >
          Wallet
        </p>
        <p className="navbar-links__p">Finanzas</p>
      </div>

      <div className="navbar-user">
        <FontAwesomeIcon
          icon={faUserCircle}
          style={{
            fontSize: "2rem",
          }}
        />
        <span style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: ".75rem", fontWeight: "bolder" }}>
            {currentUser.userName}
          </span>
          <span style={{ fontSize: ".75rem", color: "#fff" }}>$ {saldo}</span>
        </span>

        <div className="">
          <User showModal={showModal} handleCloseModal={handleCloseModal} currentUser={currentUser} />
        </div>
        <div className="">
          <Settings showSettings={showSettings} handleCloseSettings={handleCloseSettings} types={types} createTypes={createTypes} />
        </div>

        <div className="dropdown">
          <div className="dropdown-item" onClick={handleShowUser}>
            <FontAwesomeIcon icon={faUser} /> Profile
          </div>
          <div className="dropdown-item" onClick={handleShowSettings}>
            <FontAwesomeIcon icon={faGear} /> Settings
          </div>
        </div>
      </div>
    </div>
  );
}
