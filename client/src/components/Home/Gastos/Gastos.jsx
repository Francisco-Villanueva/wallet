import React from "react";
import "./Gastos.css";
import GastoCard from "./Cards/GastoCard";
import { useNavigate } from "react-router-dom";
export default function Gastos({ typesByUser }) {
  // console.log("GASTOS: ", gastos);
  // console.log("GASTOS: ", gastos)

  console.log({typesByUser})
 
  return (
    <div className="gastos-container">
     {typesByUser.map(m=>(
       <GastoCard
         key={m.typeId}
         name={m.typeName}
         mount={m.spent.reduce((a, b) => a + b.amount, 0)}
       />
     ))
    }
    </div>
  );
}
