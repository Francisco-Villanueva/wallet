import React, { useEffect, useState } from "react";
import "./Home.css";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import Gastos from "./Gastos/Gastos";
import NewSpent from "./Gastos/NewSpent/NewSpent";
import NavBar from "../Navbar/NavBar";
import { useLocation, useParams } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import Login from "../login/Login";

Chart.register(ArcElement);
export default function Home({ currentUser }) {
  const { typesByUser } = useUsers();

  const params = useParams();
  const { id } = params;

  const [showModal, setShowModal] = useState(false);

  console.log({ typesByUser });

  var total = typesByUser.reduce(
    (a, b) => a + b.spent.reduce((a, b) => a + b.amount, 0),
    0
  );

  var saldo = currentUser?.wallet.balance - total;
  let colorOrder = typesByUser.sort(
    (a, b) =>
      b.spent.reduce((a, b) => a + b.amount, 0) -
      a.spent.reduce((a, b) => a + b.amount, 0)
  );

  const DATA = {
    labels: colorOrder.map((t) => t.typeName),
    color: "white",
    datasets: [
      {
        label: "Gastos por tipo",
        data: typesByUser.map((t) => t.spent.reduce((a, b) => a + b.amount, 0)),
        // backgroundColor: colorOrder.map((t) => t.color),
        backgroundColor: ["#151a35", "#0b8661"],
        hoverBackgroundColor: ["#fff"],
        borderWidht: 0,
        border: "none",
      },
    ],
  };

  const options = {
    plugins: {
      legend: false,
      afterDraw: (chart) => {
        const ctx = chart.ctx;
        const total = chart.config.total;
        const canvasWidth = chart.width;
        const canvasHeight = chart.height;

        ctx.restore();
        const fontSize = (canvasHeight / 100).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000";
        ctx.fillText(total, canvasWidth / 2, canvasHeight / 2);
        ctx.save();
      },
    },
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const changeContent = () => {
    document.getElementById("miElemento").innerHTML = "Cargar gasto";
  };
  const restoreContent = () => {
    document.getElementById("miElemento").innerHTML = "+";
  };

  return (
    <div className="home-main">
      <div className="navBar-container">
        <NavBar userId={id} currentUser={currentUser} saldo={saldo} />
      </div>
      <div className="home-body">
        <div className="mounth-total-container">
          <h1> Saldo</h1>
          <h1>$ {saldo?.toLocaleString("de-DE")}</h1>
        </div>
        {currentUser?.wallet.spent.length === 0 ? (
          <div style={{ display: "grid", placeItems: "center" }}>
            <h2>No hay gastos</h2>
          </div>
        ) : (
          <div className="mid">
            <div className="grafico-cont">
              <div className="totalGastos">
                <h2>$ {total.toLocaleString("de-DE")}</h2>
              </div>
              <div className="grafico">
                <Doughnut
                  data={DATA}
                  // plugins={plugins}
                  options={options}
                  redraw={false}
                />
              </div>
            </div>
            <div className="labels-container">
              <h2>Gastos</h2>
              {typesByUser.spent ? (
                <span>No hay gastos</span>
              ) : (
                <Gastos currentUser={currentUser} />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="newSpent-main-container">
        <button
          id="miElemento"
          className="home__newSpent-btn"
          onClick={handleShowModal}
          onMouseOver={changeContent}
          onMouseOut={restoreContent}
        >
          +
        </button>
        <div className="NewSpentComponent-Container">
          <NewSpent
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
}
