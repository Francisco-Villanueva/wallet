import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import walletimg from "../../img/wallet.png";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { createUser, getUser } from "../../redux/actions";
import { getPasswordStrength } from "./Helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCheckCircle,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
export default function Register({ users }) {
  const dispatch = useDispatch();
  const [exit, setExit] = useState(false);
  useEffect(() => {
    dispatch(getUser());
  }, []);
  console.log("users", users);
  const [data, setData] = useState({
    userName: "",
    userEmail: "",
    userPw: "",
  });

  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
  });

  const [userExist, setUserExist] = useState(false); // [false, true
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setExit(exit === true ? false : true);
    setTimeout(() => navigate("/"), 800);
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();
    const newUser = {
      name: data.userName,
      email: data.userEmail,
      pw: data.userPw,
    };
    console.log("New User : ", newUser);
    if (newUser.name !== "" && newUser.email !== "" && newUser.pw !== "") {
      dispatch(createUser(newUser));
    }

    setExit(exit === true ? false : true);
    setTimeout(() => navigate("/"), 500);
  };

  function verificarPassword(password) {
    // expresión regular para verificar la presencia de al menos una letra mayúscula y un número
    const lengthRegex = /.{8,}/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;

    //  getPasswordStrength(password);

    setRequirements({
      length: lengthRegex.test(password),
      uppercase: uppercaseRegex.test(password),
      number: numberRegex.test(password),
    });

    if (
      lengthRegex.test(password) &&
      uppercaseRegex.test(password) &&
      numberRegex.test(password)
    ) {
      return true;
    } else {
      return false;
    }
  }

  const [calsePw, setClassPw] = useState(false);
  const [pwCoinciden, setPwCoinciden] = useState(false);

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    if ([e.target.name] == "userPw") {
      if (verificarPassword(e.target.value)) {
        setClassPw(true);
      } else {
        setClassPw(false);
      }
    }

    if ([e.target.name === "userPw2"]) {
      if (e.target.value == data.userPw && e.target.value != "") {
        setPwCoinciden(true);
      } else {
        setPwCoinciden(false);
      }
    }

    if (e.target.name === "userName") {
      if (users.find((user) => user.name === e.target.value)) {
        setUserExist(false);
      } else {
        setUserExist(true);
      }
    }
  };

  const handleDisable =
    data.userEmail && data.userName && calsePw ? false : true;

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
          <div className="inputContainer ">
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

            {data.userName !== "" ? (
              userExist ? (
                <FontAwesomeIcon
                  className="userName-error icon-checked"
                  icon={faCheckCircle}
                />
              ) : (
                <span className="userName-error">User must be unique</span>
              )
            ) : (
              ""
            )}
          </div>
          <div className="inputContainer ">
            <input
              name="userEmail"
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
              className="register-input"
            />
            <label for="username" className="label-register">
              Email
            </label>
          </div>
          <div className="inputContainer  inputContainer-pw1">
            <input
              name="userPw"
              type="password"
              placeholder="Password"
              className={
                calsePw
                  ? "pwCumple register-input"
                  : "pwNoCumple register-input"
              }
              onChange={handleInputChange}
            />
            <label for="username" className="label-register">
              Password
            </label>
            <ul className="pw-requirements-container">
              <span
                style={{
                  color: getPasswordStrength(data.userPw).color,
                  fontWeight: "800",
                  letterSpacing: "1px",
                  fontStyle: "italic",
                }}
              >
                {getPasswordStrength(data.userPw).strength}
              </span>
              <li
                className={`pw-requirements-items ${
                  requirements.length ? "pwRegCumple" : "pwRegNoCumple"
                }`}
              >
                {requirements.length ? (
                  <FontAwesomeIcon
                    className="pwRegCumple"
                    icon={faCheckCircle}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="pwRegNoCumple"
                    icon={faCircleXmark}
                  />
                )}
                Al menos 8 caracteres
              </li>
              <li
                className={`pw-requirements-items ${
                  requirements.uppercase ? "pwRegCumple" : "pwRegNoCumple"
                }`}
              >
                {requirements.uppercase ? (
                  <FontAwesomeIcon
                    className="pwRegCumple"
                    icon={faCheckCircle}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="pwRegNoCumple"
                    icon={faCircleXmark}
                  />
                )}
                Al menos una letra mayúscula
              </li>
              <li
                className={`pw-requirements-items ${
                  requirements.number ? "pwRegCumple" : "pwRegNoCumple"
                }`}
              >
                {requirements.number ? (
                  <FontAwesomeIcon
                    className="pwRegCumple"
                    icon={faCheckCircle}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="pwRegNoCumple"
                    icon={faCircleXmark}
                  />
                )}
                Al menos un número
              </li>
            </ul>
          </div>
          <div className="inputContainer inputContainer-pw2">
            <input
              name="userPw2"
              type="password"
              className={
                pwCoinciden
                  ? " register-input pwCumple"
                  : "register-input pwNoCumple"
              }
              placeholder="Confirm Password"
              onChange={handleInputChange}
            />
            <label for="username" className="label-register">
              Confirm Password
            </label>
            <span
              className={`pw2-style pw-requirements-items ${
                pwCoinciden ? "pwRegCumple" : "pwRegNoCumple"
              }`}
            >
              {pwCoinciden ? (
                <FontAwesomeIcon className="pwRegCumple" icon={faCheckCircle} />
              ) : (
                <FontAwesomeIcon
                  className="pwRegNoCumple"
                  icon={faCircleXmark}
                />
              )}
              Las contraseñas coinciden
            </span>
          </div>
        </div>
        <button
          className="register-btn"
          disabled={handleDisable}
          onClick={handleSubmitUser}
        >
          Sign In
        </button>
        <span className="register-option">
          ¿Ya tienes cuenta? <b onClick={handleRegisterClick}>Log In</b>
        </span>
      </div>
    </div>
  );
}
