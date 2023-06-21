import React from "react";
import "./NewSpent.css";
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useUsers } from "../../../../hooks/useUsers";
export default function NewSpent({ handleCloseModal, currentUser, showModal }) {
  const { types, createSpent } = useUsers();
  const [newGasto, setNewGsato] = useState({
    spentName: "",
    typeId: "",
    spentPlace: "",
    amount: "",
    spentDescripcion: "",
    paymentProof: null,
    userId: currentUser.userId,
  });

  // console.log({ types });
  const handleInputChange = (e) => {
    setNewGsato({ ...newGasto, [e.target.name]: e.target.value });
  };

  const handleSubmitNewSpent = (e) => {
    e.preventDefault();
    createSpent(newGasto);
    setNewGsato({
      spentName: "",
      typeId: "",
      spentPlace: "",
      amount: "",
      spentDescripcion: "",
      paymentProof: null,
      userId: currentUser.userId,
    });
    handleCloseModal();
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
                  name="spentName"
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
                    defaultValue={true}
                    // disabled
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
                  name="typeId"
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
                    defaultValue={true}
                    // disabled
                  >
                    TYPE
                  </option>
                  {types.map((t) => (
                    <option key={t.typeId} value={t.typeId}>
                      {t.typeName}
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
                  name="spentPlace"
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
                  name="spentDescripcion"
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
      </Modal>
    </div>
  );
}
