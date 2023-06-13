import React, { useEffect, useState } from "react";
import "./Login.css";
import walletimg from "../../img/wallet.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserById, setUserActual } from "../../redux/actions";
export default function Login() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  const allUsers = useSelector((s) => s.users);
  console.log("allUsers", allUsers);
  const [exit, setExit] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    userPw: "",
  });
  const [validPw, setValidPw] = useState(false);
  const navigate = useNavigate();

  const checkUser = (usuarios, userToCheck) => {
    const aux = usuarios.filter(
      (e) => e.name === userToCheck.userName || e.email === userToCheck.userName
    );
    console.log("aux", aux[0]);
    if (aux.length != 0) {
      if (aux[0].pw === userToCheck.userPw) {
        setExit(exit === true ? false : true);
        dispatch(setUserActual(aux[0]));
        setTimeout(() => navigate(`/home`), 1000);
      } else {
        setValidPw(true);
        // alert(`Pw INCO ${aux.userPw}  !=  ${userToCheck.userPW}`);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "User not found!",
        text: "Check username submited",
      });
    }
  };

  const handleExit = () => {
    checkUser(allUsers, user);
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegisterClick = () => {
    setExit(exit === true ? false : true);

    setTimeout(() => navigate("/register"), 500);
  };
  return (
    <div
      className={`login-main-container ${exit ? "slide-out-fwd-center" : ""}`}
    >
      <div className={`login-top focus-in-expand `}>
        <p className="title  ">
          Wallet <b>App</b>
        </p>
        <img className="heartbeat" src={walletimg} alt="walletPNG" />
      </div>
      <div className="login-bottom slide-in-top">
        <div className="login-input">
          <div className="inputContainer">
            <input
              name="userName"
              type="text"
              placeholder="User name"
              onChange={handleInputChange}
              className="register-input"
            />
            <label for="username" className="label-register">
              User Name
            </label>
          </div>

          <div className="inputContainer">
            <input
              name="userPw"
              type="password"
              className={
                validPw
                  ? "register-input pwIncorrect pwCorrect "
                  : "register-input pwCorrect"
              }
              placeholder="Password"
              onChange={handleInputChange}
            />
            <label for="username" className="label-register">
              Password
            </label>
          </div>
          {/* <span className={validPw ? "pwIncorrect" : "pwCorrect"}>
            Incorrect password
          </span> */}
        </div>
        <button onClick={handleExit} className="register-btn">
          Log In
        </button>
        <span className="register-option">
          ¿No tienes cuenta? <b onClick={handleRegisterClick}>Sign In</b>
        </span>
      </div>
    </div>
  );
}
