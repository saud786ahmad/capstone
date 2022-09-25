import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const host = "http://34.194.140.31:8080";

function PatientAppointment() {
  let [doctorsAppointment, setDoctorsAppointment] = useState([]);
  let id = JSON.parse(localStorage.getItem("patientEmail"));
  useEffect(() => {
    axios
      .get(`${host}/appointmentservice/api/v1/appointments/appointment/patient/${id}`)
      .then((res) => {
        const data = res.data;
        for (let i = 0; i < data.length; i++) {
          data[i].position = i;
        }
        setDoctorsAppointment(data);
        console.log(data);
      });
  }, []);

  let tdStyle = { textAlign: "center", verticalAlign: "middle" };

  const cancelAppointment = (buttonPosition, appointmentId) => {
    console.log(appointmentId);
    axios
      .delete(`${host}/appointmentservice/api/v1/appointments/appointment/cancel/${appointmentId}`)
      .then((res) => {
        console.log(res);
        // once the status is updated in backend and we get OK status then just update
        // the position of the array of doctorsAppointment to cancel...
        const tempArr = [];
        for (let i = 0; i < doctorsAppointment.length; i++) {
          tempArr.push(doctorsAppointment[i]);
          if (buttonPosition === tempArr[i].position) {
            tempArr[i].appointmentStatus = "Cancel";
          }
        }
        setDoctorsAppointment(tempArr);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <React.Fragment>
      <div className="col-md-9">
        <div>
          <table className="table table-bordered" id="appointment_table">
            <thead>
              <tr>
                <th style={tdStyle}>Doctor Details</th>
                <th style={tdStyle}>Appointment Date</th>
                <th style={tdStyle}>Booking Date</th>
                <th style={tdStyle}>Start Time</th>
                <th style={tdStyle}>End Time</th>
                <th style={tdStyle}>Status</th>
                <th style={tdStyle}>Cancel</th>
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
                              <h6>{appointment.doctorEmail}</h6>
                             
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={tdStyle}>{appointment.appointmentDate}</td>
                  <td style={tdStyle}>{appointment.bookedOn}</td>
                  <td style={tdStyle}>{appointment.startTime}</td>
                  <td style={tdStyle}>{appointment.endTime}</td>
                  <td style={tdStyle}>{appointment.appointmentStatus}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => {
                        cancelAppointment(appointment.position, appointment.appointmentId);
                      }}
                      className="btn btn-danger"
                      position={appointment.position}
                    >
                      Cancel
                    </button>
                  </td>
                  <td style={tdStyle}>
                    <Link to="/callPatient">
                      <button className="btn btn-sm btn-warning">Chat</button>
                    </Link>
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

export default PatientAppointment;
