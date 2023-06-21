import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./SetWallet.css";
import { useUsers } from "../../../hooks/useUsers";
export default function SetWallet({
  handleCloseModal,
  currentUser,
  showModal,
}) {
  // console.log({ currentUser });
  const { setWalletBalance } = useUsers();
  const [amount, setAmount] = useState(0);
  const handleInputChange = (e) => {
    const newAmount = parseInt(e.target.value);
    console.log(newAmount, typeof newAmount);
    setAmount(newAmount);
  };
  const handleSubmitBalance = (e) => {
    e.preventDefault();
    setWalletBalance(currentUser.userId, amount);
    handleCloseModal();
  };
  return (
    <div className={showModal ? "modal-wrapper" : ""}>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="setWallet-container "
      >
        <Modal.Header className="setWallet-header">
          <h2>Cargar Dinero</h2>
          <button
            onClick={handleCloseModal}
            className="newSpent-header__btn-closeModal"
          >
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitBalance}>
            <div className="setWallet__formCont">
              <Form.Group
                className="setWallet-input-container"
                controlId="formBasicEmail"
              >
                <label className="label-setWallet">$</label>
                <Form.Control
                  autoComplete="off"
                  name="amount"
                  className="setWallet-input"
                  type="number"
                  placeholder="Enter amount"
                  onChange={(e) => handleInputChange(e)}
                />
              </Form.Group>
              <Button className="setWallet-btn" type="submit">
                Enviar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
