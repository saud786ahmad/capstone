import React, { useState, useEffect } from "react";
import axios from "axios";
import DoctorSideNavBar from "../common/DoctorSideNavBar";

const host = "http://34.194.140.31:8080";
function PatientHistory() {
  let [doctorsAppointment, setDoctorsAppointment] = useState([]);
  let id = 1;
  let email = JSON.parse(localStorage.getItem("email"));

  useEffect(() => {
    axios
      .get(`${host}/userservice/api/v1/appointments/appointment/doctor/${email}`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setDoctorsAppointment(data);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="col-9">
        <div className="row container-fluid">
          {doctorsAppointment.map((appointment) => (
            <div
              className="col-md-3"
              style={{ marginTop: "10px" }}
              key={appointment.id}
            >
              <div className="card">
                <img
                  className="card-img-top"
                  src="https://en.pimg.jp/018/796/141/1/18796141.jpg"
                  alt="Patient Details"
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ textAlign: "center" }}>
                    {appointment.patientEmail}
                  </h5>
                  <div className="card-text">
                    <div className="row">
                      <div className="col-12" style={{ textAlign: "center" }}>
                        <span>{appointment.patientQuery}</span>
                      </div>
                      <div className="col-12" style={{ textAlign: "center" }}>
                        <span>{appointment.date}</span>
                      </div>
                      <div
                        className="col-12 mt-3"
                        style={{ textAlign: "center" }}
                      >
                        <button
                          style={{ width: "100%" }}
                          className="btn btn-success btn-sm"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {doctorsAppointment.map((appointment) => (
            <div
              className="col-md-3"
              style={{ marginTop: "10px" }}
              key={appointment.id}
            >
              <div className="card">
                <img
                  className="card-img-top"
                  src="https://en.pimg.jp/018/796/141/1/18796141.jpg"
                  alt="Patient Details"
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ textAlign: "center" }}>
                    {appointment.patientEmail}
                  </h5>
                  <div className="card-text">
                    <div className="row">
                      <div className="col-12" style={{ textAlign: "center" }}>
                        <span>{appointment.patientQuery}</span>
                      </div>
                      <div className="col-12" style={{ textAlign: "center" }}>
                        <span>{appointment.date}</span>
                      </div>
                      <div
                        className="col-12 mt-3"
                        style={{ textAlign: "center" }}
                      >
                        <button
                          style={{ width: "100%" }}
                          className="btn btn-success btn-sm"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {doctorsAppointment.map((appointment) => (
            <div
              className="col-md-3"
              style={{ marginTop: "10px" }}
              key={appointment.id}
            >
              <div className="card">
                <img
                  className="card-img-top"
                  src="https://en.pimg.jp/018/796/141/1/18796141.jpg"
                  alt="Patient Details"
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ textAlign: "center" }}>
                    {appointment.patientEmail}
                  </h5>
                  <div className="card-text">
                    <div className="row">
                      <div className="col-12" style={{ textAlign: "center" }}>
                        <span>{appointment.patientQuery}</span>
                      </div>
                      <div className="col-12" style={{ textAlign: "center" }}>
                        <span>{appointment.date}</span>
                      </div>
                      <div
                        className="col-12 mt-3"
                        style={{ textAlign: "center" }}
                      >
                        <button
                          style={{ width: "100%" }}
                          className="btn btn-success btn-sm"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {doctorsAppointment.map((appointment) => (
            <div
              className="col-md-3"
              style={{ marginTop: "10px" }}
              key={appointment.id}
            >
              <div className="card">
                <img
                  className="card-img-top"
                  src="https://en.pimg.jp/018/796/141/1/18796141.jpg"
                  alt="Patient Details"
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ textAlign: "center" }}>
                    {appointment.patientEmail}
                  </h5>
                  <div className="card-text">
                    <div className="row">
                      <div className="col-12" style={{ textAlign: "center" }}>
                        <span>{appointment.patientQuery}</span>
                      </div>
                      <div className="col-12" style={{ textAlign: "center" }}>
                        <span>{appointment.date}</span>
                      </div>
                      <div
                        className="col-12 mt-3"
                        style={{ textAlign: "center" }}
                      >
                        <button
                          style={{ width: "100%" }}
                          className="btn btn-success btn-sm"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {doctorsAppointment.map((appointment) => (
            <div
              className="col-md-3"
              style={{ marginTop: "10px" }}
              key={appointment.id}
            >
              <div className="card">
                <img
                  className="card-img-top"
                  src="https://en.pimg.jp/018/796/141/1/18796141.jpg"
                  alt="Patient Details"
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ textAlign: "center" }}>
                    {appointment.patientEmail}
                  </h5>
                  <div className="card-text">
                    <div className="row">
                      <div className="col-12" style={{ textAlign: "center" }}>
                        <span>{appointment.patientQuery}</span>
                      </div>
                      <div className="col-12" style={{ textAlign: "center" }}>
                        <span>{appointment.date}</span>
                      </div>
                      <div
                        className="col-12 mt-3"
                        style={{ textAlign: "center" }}
                      >
                        <button
                          style={{ width: "100%" }}
                          className="btn btn-success btn-sm"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default PatientHistory;
