import React, { useState } from "react";
import "./CardSpent.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faTrash,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useUsers } from "../../../../../hooks/useUsers";
export default function CardSpent({ spent, buscador }) {
  // console.log("SPENT", spent);
  const { deleteSpent } = useUsers();
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
        deleteSpent(id);
      }
    });
    // dispatch(getAllSpents());
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
        <div className="cardSpent-contianer__title">
          <h3 className="destinatario">{spent.spentName}</h3>
          <span>
            a {spent.spentPlace} -{" "}
            <span style={{ fontStyle: "italic" }}>
              {" "}
              {spent.spentDescripcion}{" "}
            </span>
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
          onClick={() => handleDeleteSpent(spent.spentId)}
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
    </div>
  );
}
