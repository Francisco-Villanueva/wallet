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
export default function User({ showModal, handleCloseModal, currentUser }) {
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
            <h4>{currentUser.userName}</h4>
          </div>
          <div className="userInfo-body__item">
            <FontAwesomeIcon icon={faEnvelope} />
            <h4>{currentUser.userEmail}</h4>
          </div>
          <div className="userInfo-body__item">
            <FontAwesomeIcon icon={faDollarSign} />
            <h3>25.000</h3>
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
