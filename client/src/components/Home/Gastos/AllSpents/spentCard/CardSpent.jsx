import React, { useState } from "react";
import "./CardSpent.css";

import ComprobantePago from "../Comprobante/ComprobantePago";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faArrowLeftLongToLine,
  faTrash,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { deleteSpent, getAllSpents } from "../../../../../redux/actions";
export default function CardSpent({ spent, buscador }) {
  // console.log("SPENT", spent);
  const handleDate = (date) => {
    const fecha = new Date(date);

    const day = fecha.getUTCDate();
    const nombresMeses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const month = nombresMeses[fecha.getUTCMonth()];
    return `${day}, ${month}`;
  };
  const dispatch = useDispatch();
  const handleDeleteSpent = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5071be",
      cancelButtonColor: "#cecece",
      confirmButtonText: "Yes, delete it!",
      iconColor: "#5071be",
      background: "#f5f5f5",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSpent(id));
      }
    });
    dispatch(getAllSpents());
    // dispatch(deleteSpent(id));
  };

  const [comprobantePago, setComprobantePago] = useState(null);

  const handleVerComprobante = (url) => {
    setComprobantePago(url);
  };
  return (
    <div className="cardSpent-contianer">
      <div className="receptor">
        <FontAwesomeIcon icon={faChartPie} />
        <div lassName="cardSpent-contianer__title">
          <h3 className="destinatario">{spent.name}</h3>
          <span>
            a {spent.place} -{" "}
            <span style={{ fontStyle: "italic" }}> {spent.descripcion} </span>
          </span>
        </div>
      </div>
      <div className="cardSpent-contianer__body">
        <div className="cardSpent-contianer__body__mount">
          <h4>$ {spent.amount.toLocaleString("de-DE")}</h4>
          <span>{handleDate(spent.date)}</span>
        </div>
      </div>
      <div className="cardSpent-contianer__body__icon">
        <FontAwesomeIcon
          icon={faTrash}
          className="SpentTrash"
          onClick={() => handleDeleteSpent(spent.id)}
        />
        {spent.paymentProof ? (
          <FontAwesomeIcon
            icon={faFilePdf}
            className="SpentTrash"
            onClick={() => handleVerComprobante(spent.paymentProof)}
          />
        ) : (
          ""
        )}
      </div>

      {comprobantePago ? <ComprobantePago src={comprobantePago} /> : null}
    </div>
  );
}
