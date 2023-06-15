import React from "react";
import "./GastoCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
export default function GastoCard({ name, mount, color, date, idType }) {
  const navigate = useNavigate();
  const handleNav = (idTipo) => {
    navigate(`/allSpents/${idTipo}`);
  };
  return (
    <div className="gastoCard-cont" onClick={() => handleNav(idType)}>
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
