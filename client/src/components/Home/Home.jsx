import React, { useEffect, useState } from "react";
import "./Home.css";
import { Pie, Doughnut } from "react-chartjs-2";
import Gastos from "./Gastos/Gastos";
import NewSpent from "./Gastos/NewSpent/NewSpent";
import { Chart, ArcElement } from "chart.js";
import NavBar from "../Navbar/NavBar";
import { useLocation, useParams } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";

Chart.register(ArcElement);

export default function Home({ types, wallets }) {
  const { currentUser, typesByUser, allSpents } = useUsers();

  // console.log({ currentUser });
  const params = useParams();
  const { id } = params;

  const [showModal, setShowModal] = useState(false);

  // console.log("wallets", wallets);

  var total = currentUser.wallet.spent.reduce((a, b) => a + b.amount, 0);
  var saldo = wallets.length > 0 ? wallets[0].money - total : 0;
  let colorOrder = types.sort(
    (a, b) =>
      b.spent.reduce((a, b) => a + b.amount, 0) -
      a.spent.reduce((a, b) => a + b.amount, 0)
  );
  const DATA = {
    labels: colorOrder.map((t) => t.name),
    color: "white",
    datasets: [
      {
        label: "Gastos por tipo",
        data: types.map((t) => t.mount),
        backgroundColor: colorOrder.map((t) => t.color),
        hoverBackgroundColor: ["#fff"],
        borderWidht: 0,
        border: "none",
      },
    ],
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // console.log("gastos hechos: ", gastosPorType, "\nsuma: ", total);

  return (
    <div className="home-main">
      <div className="navBar-container">
        <NavBar userName={"pepe"} userId={id} />
      </div>
      <div className="home-body">
        <div className="mounth-total-container">
          <h1> Saldo</h1>
          <h1>$ {saldo.toLocaleString("de-DE")}</h1>
        </div>
        {currentUser.wallet.spent.length === 0 ? (
          <div style={{ display: "grid", placeItems: "center" }}>
            <h2>No hay gastos</h2>
          </div>
        ) : (
          <div className="mid">
            <div className="grafico-cont">
              {/* <Pie data={DATA} options={true} redraw={false} /> */}
              <div className="grafico-cont__totalGastos">
                <h2>$ {total.toLocaleString("de-DE")}</h2>
              </div>
              <Doughnut data={DATA} options={false} redraw={false} />
            </div>
            <div className="labels-container">
              <Gastos typesByUser={typesByUser} />
            </div>
          </div>
        )}
      </div>

      <div className="newSpent-main-container">
        <button className="home__newSpent-btn" onClick={handleShowModal}>
          +
        </button>
        <div className="NewSpentComponent-Container">
          <NewSpent showModal={showModal} handleCloseModal={handleCloseModal} />
        </div>
      </div>
    </div>
  );
}
