import React, { useState } from "react";
import styles from "./Login.module.css";
import registerImg from "../../assets/register.jpg";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const host = "http://34.194.140.31:8080";

function Login(props) {
  const [formData, setformData] = useState({
    role: "patient",
    email: "",
    password: "",
  });
  const [error, setError] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const formHandler = (e) => {
    formData[e.target.name] = e.target.value;
    setformData((prev) => {
      return { ...formData };
    });
  };
  const roleHandler = (role) => {
    setformData((prev) => {
      return { ...prev, role: role };
    });
  };
  function validateEmail(e) {
    if (!e.target.value) {
      error[e.target.name] = "Required";
      setError((prev) => {
        return { ...error };
      });
      return;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
      error[e.target.name] = "";
      setError((prev) => {
        return { ...error };
      });
    } else {
      error[e.target.name] = "Invalid email address";
      setError((prev) => {
        return { ...error };
      });
    }
  }
  const validate = (e) => {
    if (!e.target.value) {
      error[e.target.name] = "Required";
      setError((prev) => {
        return { ...error };
      });
    } else {
      error[e.target.name] = "";
      setError((prev) => {
        return { ...error };
      });
    }
  };
  const validateBeforeLogin = () => {
    for (let key in formData) {
      if (!formData[key]) {
        error[key] = "Required";
        setError((prev) => {
          return { ...error };
        });
      }
    }
  };
  const loginHandler = async () => {
    validateBeforeLogin();
    let data = { email: formData.email, password: formData.password };
    console.log("data", formData, data);
    if (formData.role === "patient") {
      try {
        let response = await axios.post(
          `${host}/authenticationservice/api/v1/auth/patient/login`,
          data
        );
        if (response.status == 202) {
          localStorage.setItem("patientEmail", JSON.stringify(formData.email));
          // this userLogged will update the state and then header will render...
          props.onUserLogged();
          navigate("/patient/userprofile");
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        let response = await axios.post(
          `${host}/authenticationservice/api/v1/auth/doctor/login`,
          data
        );
        if (response.status == 202) {
          localStorage.setItem("doctorEmail", JSON.stringify(formData.email));
          // this userLogged will update the state and then header will render...
          props.onUserLogged();
          navigate("/doctor/doctorProfile");
        }
        console.log(response);
      } catch (e) {
        console.log(error);
      }
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div
          className={`col image-container p-5-lg d-flex align-items-center ${styles.imgContainer}`}
        >
          <img
            className={`w-100 ${styles.img}`}
            src={registerImg}
            alt=" group of doctors"
          />
        </div>
        <div className="col form-container d-flex align-items-center">
          <div className={styles.form}>
            <div className="d-flex buttons mb-3">
              <button
                onClick={() => {
                  roleHandler("patient");
                }}
                type="button"
                className={
                  formData.role === "patient"
                    ? `btn btn-outline me-2 ps-4 pe-4 ${styles.selected}`
                    : "btn btn-outline me-2 ps-4 pe-4"
                }
              >
                As Patient
              </button>
              <button
                onClick={() => {
                  roleHandler("doctor");
                }}
                type="button"
                className={
                  formData.role === "doctor"
                    ? `btn btn-outline me-2 ps-4 pe-4 ${styles.selected}`
                    : "btn btn-outline me-2 ps-4 pe-4"
                }
              >
                As Doctor
              </button>
            </div>
            <div className="inputWrapper w-100 mb-3 d-flex flex-column align-items-start">
              <input
                value={formData.email}
                onChange={(e) => {
                  formHandler(e);
                  validateEmail(e);
                }}
                type="text"
                className="form-control"
                placeholder="Email"
                name="email"
                aria-describedby="emailHelp"
              ></input>
              {error.email ? (
                <>
                  <span className={styles.error}>{error.email}</span>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="inputWrapper w-100 mb-3 d-flex flex-column align-items-start">
              <input
                value={formData.password}
                onChange={(e) => {
                  formHandler(e);
                  validate(e);
                }}
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                aria-describedby="passwordHelp"
              ></input>
              {error.password ? (
                <>
                  <span className={styles.error}>{error.password}</span>
                </>
              ) : (
                <></>
              )}
            </div>
            <p className="float-start mb-3">
              <a href="/"> Forgot Password ?</a>
            </p>
            <span className="float-start">
              Not a member? <Link to="/register"> Register here </Link>
            </span>
            <button
              disabled={!error.email & !error.password ? false : true}
              onClick={loginHandler}
              type="button"
              className={styles.register}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
