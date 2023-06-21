import React, { useEffect, useState } from "react";
import "./Wallet.css";
import NavBar from "../Navbar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faWallet } from "@fortawesome/free-solid-svg-icons";
import CardSpent from "../Home/Gastos/AllSpents/spentCard/CardSpent";
import { useUsers } from "../../hooks/useUsers";
import SetWallet from "./WalletBalance/SetWallet";
export default function Wallet({ currentUser }) {
  const { deleteSpent, getAllSpents, typesByUser } = useUsers();
  // console.log({ currentUser });
  const [selectedCards, setSelectedCards] = useState([]);

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedCards([...selectedCards, id]);
    } else {
      setSelectedCards(selectedCards.filter((selectedId) => selectedId !== id));
    }
  };
  const handleDeleteSpent = (id) => {
    deleteSpent(id);
    getAllSpents();
    // dispatch(deleteSpent(id));
  };

  const handleDeleteSelected = () => {
    selectedCards.forEach((id) => handleDeleteSpent(id));
    // deleteCard(selectedCards);
    setSelectedCards([]);
  };

  const totalCuenta = (walletMoney) => {
    let totalSpents =
      currentUser.wallet.spent.length > 0
        ? typesByUser.reduce(
            (a, b) => a + b.spent.reduce((a, b) => a + b.amount, 0),
            0
          )
        : 0;
    // console.log("totalSpents", totalSpents);
    return walletMoney - totalSpents;
  };
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="navBar-main">
      <section className="wallet-navbar-container">
        <NavBar currentUser={currentUser} />
      </section>

      <section className="wallet-body">
        <div className="wallet-body__div wallet-body__money">
          <div>
            <span>Dinero disponible</span>
            <h3 style={{ margin: 0, fontSize: "2.8rem" }}>
              ${" "}
              {currentUser.wallet.spent.length > 0
                ? totalCuenta(currentUser.wallet.balance).toLocaleString(
                    "de-DE"
                  )
                : "-loading"}
            </h3>
          </div>
          <div
            style={{
              textAlign: "end",
            }}
          >
            <button className="ingresarMoney-btn" onClick={handleShowModal}>
              Ingresar dinero
            </button>
            <div>
              <SetWallet
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                currentUser={currentUser}
              />
            </div>
          </div>
        </div>

        <div className="wallet-body__div wallet-body__actions">
          <div className="wallet-body__actions__div">
            <FontAwesomeIcon icon={faWallet} />
            <span>action</span>
          </div>
          <div className="wallet-body__actions__div">
            <FontAwesomeIcon icon={faWallet} />
            <span>action</span>
          </div>
          <div className="wallet-body__actions__div">
            <FontAwesomeIcon icon={faWallet} />
            <span>action</span>
          </div>
        </div>
        <div className="wallet-body__div wallet-body__activity">
          <div className="activity_header">
            <div>
              <h2 style={{ margin: 0 }}>Actividad</h2>
            </div>
            <div>
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
          </div>
          <div className="activity_buscador">
            <FontAwesomeIcon icon={faSearch} />
            <input
              className="activity_buscador__input"
              type="text"
              placeholder="Buscar"
              name=""
              id=""
            />
          </div>
          <div className="activities-container">
            {typesByUser.map((m) =>
              m.spent.map((s) => (
                <div
                  key={s.spentId}
                  style={{ display: "grid", gridTemplateColumns: ".2fr 7fr" }}
                >
                  <input
                    className="allSpents-Cards-Container__checkbox"
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(e, s.spentId)}
                  />

                  <CardSpent spent={s} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
