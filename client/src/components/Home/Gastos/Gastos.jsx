import React, { useEffect } from "react";
import "./Gastos.css";
import GastoCard from "./Cards/GastoCard";
import { useUsers } from "../../../hooks/useUsers";
export default function Gastos({ currentUser }) {
  const { typesByUser } = useUsers();

  const typesSorted = typesByUser.sort(
    (a, b) =>
      b.spent.reduce((a, b) => a + b.amount, 0) -
      a.spent.reduce((a, b) => a + b.amount, 0)
  );

  return (
    <div className="gastos-container">
      {typesSorted.map((m) => (
        <GastoCard
          key={m.typeId}
          idType={m.typeId}
          name={m.typeName}
          mount={m.spent.reduce((a, b) => a + b.amount, 0)}
        />
      ))}
    </div>
  );
}
