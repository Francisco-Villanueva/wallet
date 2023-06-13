import React from "react";
import "./Gastos.css";
import GastoCard from "./Cards/GastoCard";
import { useNavigate } from "react-router-dom";
export default function Gastos({ gastos, userName }) {
  // console.log("GASTOS: ", gastos);
  gastos.sort((a, b) => b.mount - a.mount);
  const navigate = useNavigate();
  const handleNav = (tipo) => {
    navigate(`/allSpents/:${tipo}}`);
  };
  return (
    <div className="gastos-container">
      {gastos.map((m) => (
        <GastoCard
          key={m.name}
          userName={userName}
          name={m.name}
          mount={m.mount}
          color={m.color}
          onClick={() => handleNav(m.name)}
        />
      ))}
    </div>
  );
}
