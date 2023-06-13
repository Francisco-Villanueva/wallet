import React, { useEffect, useState } from "react";
import "./Home.css";
import { Pie, Doughnut } from "react-chartjs-2";
import Gastos from "./Gastos/Gastos";
import { useSelector, useDispatch } from "react-redux";
import NewSpent from "./Gastos/NewSpent/NewSpent";
import { Chart, ArcElement } from "chart.js";
import NavBar from "../Navbar/NavBar";
import { useLocation, useParams } from "react-router-dom";
import { getUserById } from "../../redux/actions";

Chart.register(ArcElement);

export default function Home({ typesSpents, wallets }) {
  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;
  console.log("id", id);
  useEffect(() => {
    dispatch(getUserById(id));
  }, []);
  const allSpents = useSelector((s) => s.spents);
  const userLoged = useSelector((s) => s.userData);

  // const userLoged = dispatch(getUserById(userActual.id));

  console.log("USER LOGED", userLoged);
  const [showModal, setShowModal] = useState(false);

  // console.log("wallets", wallets);

  var total = allSpents.reduce((a, b) => a + b.amount, 0);
  var saldo = wallets.length > 0 ? wallets[0].money - total : 0;
  let colorOrder = typesSpents.sort((a, b) => b.mount - a.mount);
  const DATA = {
    labels: colorOrder.map((t) => t.name),
    color: "white",
    datasets: [
      {
        label: "Gastos por tipo",
        data: typesSpents.map((t) => t.mount),
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
        {allSpents.length === 0 ? (
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
              <Gastos gastos={typesSpents} />
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
