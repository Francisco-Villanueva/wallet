import React from "react";
import "./NewSpent.css";
import { TYPES } from "../../../Home/data";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createSpent, getAllSpents } from "../../../../redux/actions";

import { Button, Modal, Form } from "react-bootstrap";
export default function NewSpent({ handleCloseModal, showModal }) {
  const [newGasto, setNewGsato] = useState({
    name: "",
    type: "",
    place: "",
    amount: "",
    descripcion: "",
    paymentProof: null,
  });
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    console.log(e.target.name, e.target.value);
    setNewGsato({ ...newGasto, [e.target.name]: e.target.value });
  };

  const handleSubmitNewSpent = (e) => {
    e.preventDefault();
    console.log(newGasto);
    dispatch(createSpent(newGasto));
    dispatch(getAllSpents());

    setNewGsato({
      name: "PAGO",
      type: "TIPO",
      place: "",
      amount: "",
      descripcion: "",
      paymentProof: null,
    });
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setNewGsato((prevFormData) => ({
      ...prevFormData,
      paymentProof: file,
    }));
  };
  return (
    <div className={showModal ? "modal-wrapper" : ""}>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="newSpent-container "
      >
        <Modal.Header className="newSpent-header">
          <h2>Cargar Gasto</h2>
          <button
            onClick={handleCloseModal}
            className="newSpent-header__btn-closeModal"
          >
            X
          </button>
        </Modal.Header>
        <Modal.Body className="">
          <Form onSubmit={handleSubmitNewSpent} className="form-newspent">
            <div className="form-newspent__selects-section">
              <Form.Group controlId="formBasicEmail">
                <Form.Select
                  className="selectSty"
                  aria-label="Default select example"
                  name="name"
                  onChange={(e) => handleInputChange(e)}
                >
                  <option
                    style={{
                      fontWeight: "900",
                      letterSpacing: "5px",
                      color: "#fff",
                      backgroundColor: "#3c5ba5",
                    }}
                    value=""
                    selected
                    disabled
                  >
                    PAGO
                  </option>
                  <option value="Pago con QR">Pago con QR</option>
                  <option value="Transferencia">Transferencia</option>
                  <option value="Efectivo">Efectivo</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Select
                  className="selectSty"
                  aria-label="Default select example"
                  name="type"
                  onChange={(e) => handleInputChange(e)}
                >
                  <option
                    style={{
                      fontWeight: "900",
                      letterSpacing: "5px",
                      color: "#fff",
                      backgroundColor: "#3c5ba5",
                    }}
                    value=""
                    selected
                    disabled
                  >
                    TYPE
                  </option>
                  {TYPES.map((t) => (
                    <option key={t.name} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="form-newSpent-section-mid ">
              <Form.Group className=" newSpent-input-container">
                <label className="label-newSpent">Destinatario</label>
                <Form.Control
                  autoComplete="off"
                  name="place"
                  type="text"
                  className="newSpent-input"
                  placeholder="Enter name"
                  onChange={(e) => handleInputChange(e)}
                />
              </Form.Group>
              <Form.Group className=" newSpent-input-container">
                <label className="label-newSpent">$</label>
                <Form.Control
                  autoComplete="off"
                  name="amount"
                  className="newSpent-input"
                  type="number"
                  placeholder="Enter name"
                  onChange={(e) => handleInputChange(e)}
                />
              </Form.Group>
              <Form.Group className=" newSpent-input-container">
                <label className="label-newSpent">Descripcion</label>
                <Form.Control
                  autoComplete="off"
                  name="descripcion"
                  className="newSpent-input"
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) => handleInputChange(e)}
                />
              </Form.Group>
            </div>

            <Button className="newSpent-btn" type="submit">
              Enviar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

{
  /* <div className="newSpent-container">
<h2>Cargar Gasto</h2>
<div className="form-newspent">
  <div className="form-newSpent-section">
    <select
      onChange={handleInputChange}
      className="selectSty"
      name="name"
      id=""
    >
      <option
        style={{
          fontWeight: "900",
          letterSpacing: "5px",
          color: "#fff",
          backgroundColor: "#3c5ba5",
        }}
        value=""
        selected
        disabled
      >
        PAGO
      </option>
      <option value="Pago con QR">Pago con QR</option>
      <option value="Transferencia">Transferencia</option>
      <option value="Efectivo">Efectivo</option>
    </select>
    <select
      onChange={handleInputChange}
      className="selectSty"
      name="type"
      id=""
    >
      <option
        style={{
          fontWeight: "900",
          letterSpacing: "5px",
          color: "#fff",
          backgroundColor: "#3c5ba5",
        }}
        value=""
        selected
        disabled
      >
        TYPE
      </option>
      {TYPES.map((t) => (
        <option value={t.name}>{t.name}</option>
      ))}
    </select>
  </div>
  <div className="form-newSpent-section form-newSpent-section-mid">
    <div className="newSpent-input-container">
      <label for="Destinatario" className="label-newSpent">
        Destinatario
      </label>
      <input
        name="place"
        onChange={handleInputChange}
        className="newSpent-input"
        type="text"
        placeholder="Destinatario"
        value={newGasto.place}
        id="miInput"
      />
    </div>
    <div className="newSpent-input-container">
      <label for="amount" className="label-newSpent">
        $
      </label>
      <input
        name="amount"
        onChange={handleInputChange}
        className="newSpent-input "
        type="numer"
        placeholder="$"
        value={newGasto.amount}
        id="miInput"
      />
    </div>
    <div className="newSpent-input-container">
      <label for="descripcion" className="label-newSpent">
        Descripcion
      </label>
      <input
        id="miInput"
        name="descripcion"
        onChange={handleInputChange}
        className="newSpent-input descripcion"
        type="numer"
        placeholder="Descripcion"
        value={newGasto.descripcion}
      />
    </div>
    <div className="newSpent-input-container">
      <label for="descripcion" className="label-newSpent">
        Comprobante
      </label>
      <label htmlFor="" className="input-file">
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileChange}
          style={{ width: "20%", margin: "0" }}
        />
      </label>
    </div>
  </div>
</div>
<button className="newSpent-btn" onClick={handleSubmitNewSpent}>
  Submit
</button>
</div> */
}
