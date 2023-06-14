import React from "react";
import "./Gastos.css";
import GastoCard from "./Cards/GastoCard";
import { useNavigate } from "react-router-dom";
export default function Gastos({ gastos, userName }) {
  // console.log("GASTOS: ", gastos);
  gastos.sort((a, b) => b.spent.reduce((a, b) => a + b.amount, 0) - a.spent.reduce((a, b) => a + b.amount, 0));

  console.log("GASTOS: ", gastos)
  const navigate = useNavigate();
  const handleNav = (tipo) => {
    navigate(`/allSpents/:${tipo}}`);
  };
  return (
    <div className="gastos-container">
      {gastos.map((m) => (
        <GastoCard
          key={m.typeId}
          userName={userName}
          name={m.typeName}
          mount={m.spent.reduce((a, b) => a + b.amount, 0)}
          color={m.color}
          onClick={() => handleNav(m.typeId)}
        />
      ))}
    </div>
  );
}
