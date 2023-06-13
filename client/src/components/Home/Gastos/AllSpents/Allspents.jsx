import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllSpents, deleteSpent } from "../../../../../src/redux/actions";
import Swal from "sweetalert2";

import "./Allsents.css";
import { useParams } from "react-router-dom";
import CardSpent from "./spentCard/CardSpent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
export default function Allspents({ spents }) {
  const options = {};

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          "rgba(255, 99, 132, 0.75)",
          "rgba(255, 159, 64, 0.75)",
          "rgba(255, 205, 86, 0.75)",
          "rgba(75, 192, 192, 0.75)",
          "rgba(54, 162, 235, 0.75)",
          "rgba(153, 102, 255, 0.75)",
          "rgba(201, 203, 207, 0.75)",
        ],
        width: "1px",
        borderColor: "rgb(255, 99, 132)",
        hoverOffset: 4,
        stack: "Stack 0",
      },
    ],
  };
  const params = useParams();
  const { type } = params;
  const navigate = useNavigate();

  const spents_filter = spents.filter((s) => s.type === type);
  const handleBackPage = () => {
    navigate("/home");
  };
  const total = spents_filter.reduce((acc, s) => acc + s.amount, 0);
  // console.log(type, spents_filter);

  //FUNCIONALIDADES PARA EL DELETEO MÚLTIPLE
  const [selectedCards, setSelectedCards] = useState([]);
  const dispatch = useDispatch();
  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedCards([...selectedCards, id]);
    } else {
      setSelectedCards(selectedCards.filter((selectedId) => selectedId !== id));
    }
  };

  const handleDeleteSpent = (id) => {
    dispatch(deleteSpent(id));
    dispatch(getAllSpents());
    // dispatch(deleteSpent(id));
  };
  const handleDeleteSelected = () => {
    selectedCards.forEach((id) => handleDeleteSpent(id));
    // deleteCard(selectedCards);
    setSelectedCards([]);
  };

  return (
    <div className="allSpents-contianer">
      <section className="allSpentents__arrow-container">
        <div className="arrow-cont" onClick={handleBackPage}>
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </div>
      </section>
      <div className="allSpents__body">
        <section className=" allSpents__body-section allSpents-header">
          <div>
            <h1 style={{ margin: 0 }} className="allSpents-contianer__title">
              {type}
            </h1>
            <span>Abril</span>
          </div>
          <div>
            <h1> $ {total.toLocaleString("de-DE")}</h1>
          </div>
        </section>
        <section className="allSpents__body-section allSpents-graphics">
          <Bar data={data} options={true} />
        </section>
        <section className="allSpents__body-section allSpents-gastos">
          {/* <h3 style={{ margin: 0 }} className="allSpents-contianer__title">
          Detalle{" "}
        </h3> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "40px",
            }}
          >
            <span
              style={{
                fontSize: ".85em",
                fontWeight: "600",
                fontStyle: "italic",
                color: "#6c757d",
              }}
            >
              {spents_filter.length} gastos del mes
            </span>
            {selectedCards.length > 0 ? (
              <button
                onClick={handleDeleteSelected}
                className={`btn-multipleDelete focus-in-expand  }`}
              >
                {" "}
                Eliminar seleccionados
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="allSpents-Cards-Container">
            {spents_filter.map((s) => (
              <div
                key={s.id}
                style={{ display: "grid", gridTemplateColumns: ".2fr 7fr" }}
              >
                <input
                  className="allSpents-Cards-Container__checkbox"
                  type="checkbox"
                  onChange={(e) => handleCheckboxChange(e, s.id)}
                />

                <CardSpent spent={s} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
