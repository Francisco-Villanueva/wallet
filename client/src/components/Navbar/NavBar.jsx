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
export default function NavBar({ userName, userId }) {
  console.log("ID QUE LLEGA AL NAVBAR", userId);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
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
        <p className="navbar-links__p">Contact</p>
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
            {userName}
          </span>
          <span style={{ fontSize: ".75rem", color: "#fff" }}>$12.450</span>
        </span>

        <div className="">
          <User showModal={showModal} handleCloseModal={handleCloseModal} />
        </div>
        <div className="dropdown">
          <div className="dropdown-item" onClick={handleShowModal}>
            <FontAwesomeIcon icon={faUser} /> Profile
          </div>
          <div className="dropdown-item">
            <FontAwesomeIcon icon={faGear} /> Settings
          </div>
        </div>
      </div>
    </div>
  );
}
