import React from "react";
import "./User.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faEnvelope,
  faMoneyBill,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
export default function User({ showModal, handleCloseModal }) {
  return (
    <div className={showModal ? "userInfo-container__main" : ""}>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="userInfo-container"
      >
        <Modal.Header className="userInfo-container__header">
          <h2>Usuario</h2>
          <button
            onClick={handleCloseModal}
            className="newSpent-header__btn-closeModal"
          >
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="userInfo-body__item">
            <FontAwesomeIcon icon={faUser} />
            <h1>nombre</h1>
          </div>
          <div className="userInfo-body__item">
            <FontAwesomeIcon icon={faEnvelope} />
            <h1>nombre</h1>
          </div>
          <div className="userInfo-body__item">
            <FontAwesomeIcon icon={faDollarSign} />
            <h1>25.000</h1>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="userInfo-footer">
            <button className="userInfo-footer__btn">Editar</button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
