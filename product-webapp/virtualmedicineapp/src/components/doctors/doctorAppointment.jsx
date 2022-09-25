import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorSideNavBar from "../common/DoctorSideNavBar";
import { Link } from "react-router-dom";

let host = "http://34.194.140.31:8080";

function DoctorAppointment() {
  let [doctorsAppointment, setDoctorsAppointment] = useState([]);
  let email = JSON.parse(localStorage.getItem("doctorEmail"));

  useEffect(() => {
    axios
      .get(
        `${host}/appointmentservice/api/v1/appointments/appointment/doctor/${email}`
      )
      .then((res) => {
        const data = res.data;
        console.log(res);
        setDoctorsAppointment(data);
      });
  }, []);

  let tdStyle = { textAlign: "center", verticalAlign: "middle" };

  return (
    <React.Fragment>
      <div className="col-md-9">
        <div>
          <table className="table table-bordered" id="appointment_table">
            <thead>
              <tr>
                <th style={tdStyle}>Patient</th>
                <th style={tdStyle}>Booking Date</th>
                <th style={tdStyle}>Appointment Date</th>
                <th style={tdStyle}>Start Time</th>
                <th style={tdStyle}>End Time</th>
                <th style={tdStyle}>Status</th>
                <th style={tdStyle}>Chat</th>
              </tr>
            </thead>
            <tbody>
              {doctorsAppointment.map((appointment) => (
                <tr key={appointment.id}>
                  <td>
                    <div className="row">
                      <div className="col" style={{ textAlign: "center" }}>
                        <div>
                          <img
                            className="thumbnail"
                            src="https://en.pimg.jp/018/796/141/1/18796141.jpg"
                            alt="img"
                            style={{ width: "50px" }}
                          />
                        </div>
                        <div className="">
                          <div className="">
                            <p>
                              <span>{appointment.patientEmail}</span>
                              <br />
                              <span>{appointment.patientQuery}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={tdStyle}>{appointment.bookedOn}</td>
                  <td style={tdStyle}>{appointment.appointmentDate}</td>
                  <td style={tdStyle}>{appointment.startTime}</td>
                  <td style={tdStyle}>{appointment.endTime}</td>
                  <td style={tdStyle}>{appointment.appointmentStatus}</td>
                  <td style={tdStyle}>
                    <div className="row">
                      <td style={tdStyle}>
                        <Link to="/callPatient">
                          <button className="btn btn-sm btn-warning">
                            Chat
                          </button>
                        </Link>
                      </td>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DoctorAppointment;
