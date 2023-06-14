import React from "react";
import "./GastoCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
export default function GastoCard({ name, mount, color, date, type }) {
  const navigate = useNavigate();
  const handleNav = (tipo) => {
    navigate(`/allSpents/${tipo}`);
  };
  return (
    <div className="gastoCard-cont" onClick={() => handleNav(name)}>
      <div>
        <b style={{ color: color }}>
          {" "}
          <FontAwesomeIcon icon={faWallet} />{" "}
        </b>
        <b className="typeName"> {name}</b>
      </div>
      <b>$ {mount.toLocaleString("de-DE")}</b>
    </div>
  );
}
