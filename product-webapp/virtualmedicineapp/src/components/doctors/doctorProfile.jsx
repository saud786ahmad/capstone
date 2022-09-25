import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

let host = "http://34.194.140.31:8080";

function DoctorProfile() {
  const doctorEmail = JSON.parse(localStorage.getItem("doctorEmail"));
  let [doctorInfo, setDoctorInfo] = useState({});
  let [disabled, setDisabled] = useState(true);
  let [oldDoctorInfo, setOldDoctorInfo] = useState({});

  useEffect(() => {
    axios.get(`${host}/userservice/api/v1/user/doctor/${doctorEmail}`).then((res) => {
      const doctor = res.data;
      setDoctorInfo(doctor);
      setOldDoctorInfo(doctor);
    });
  }, []);

  const editAllFields = () => {
    setDisabled(false);
  };

  // This function will run when update button will clicked...
  const saveDoctorProfileData = () => {
    let check = true;
    for (let old in oldDoctorInfo) {
      if (oldDoctorInfo[old] !== doctorInfo[old]) {
        check = false;
      }
    }

    if (check === false) {
      axios.put(`${host}/userservice/api/v1/user/doctor`, doctorInfo).then((response) => {
        setDoctorInfo(response.data);
        setDisabled(true);
        Swal.fire(
          "Success!",
          "You Profile is updated successfully!",
          "success"
        );      });
    } else {
      Swal.fire(
        "OOPS!",
        "Data is Same",
        "error"
      );
      setDisabled(true);
    }
  };

  return (
    <React.Fragment>
      <div className="col-md-9">
        <div className="container rounded bg-white">
          <div className="row border">
            <div className="col-md-12 border-right doctorProfileInput">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Your Profile</h4>
                  <h2>
                    <i className="fas fa-edit" onClick={editAllFields}></i>
                  </h2>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6 doctorProfileInput">
                    <label className="labels">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="first name"
                      value={doctorInfo.name}
                      disabled={disabled ? true : false}
                      onChange={(e) => {
                        e.persist();
                        setDoctorInfo((prev) => {
                          return { ...prev, name: e.target.value };
                        });
                      }}
                    />
                    <label className="errors"></label>
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email Id"
                      value={doctorInfo.email}
                      disabled={disabled ? true : false}
                      onChange={(e) => {
                        e.persist();
                        setDoctorInfo((prev) => {
                          return { ...prev, email: e.target.value };
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label className="labels">Specialization</label>
                    <input
                      type="text"
                      className="form-control"
                      value={doctorInfo.specialization}
                      placeholder="Write your Specialization here"
                      disabled={disabled ? true : false}
                      onChange={(e) => {
                        e.persist();
                        setDoctorInfo((prev) => {
                          return {
                            ...prev,
                            specialization: e.target.value,
                          };
                        });
                      }}
                    />
                  </div>
                  <div className="col-md-12 mt-3">
                    <label className="labels">Mobile No.</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Mobile Number"
                      value={doctorInfo.mobileNo}
                      disabled={disabled ? true : false}
                      onChange={(e) => {
                        e.persist();
                        setDoctorInfo((prev) => {
                          return { ...prev, mobileNo: e.target.value };
                        });
                      }}
                    />
                  </div>
                  <div className="col-md-12 mt-3">
                    <label className="labels">MCI</label>
                    <input
                      type="text"
                      className="form-control"
                      value={doctorInfo.mci}
                      disabled={disabled ? true : false}
                      onChange={(e) => {
                        e.persist();
                        setDoctorInfo((prev) => {
                          return { ...prev, mci: e.target.value };
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label className="labels">City</label>
                    <input
                      type="text"
                      className="form-control"
                      value={doctorInfo.city}
                      placeholder="Write your City Name"
                      disabled={disabled ? true : false}
                      onChange={(e) => {
                        e.persist();
                        setDoctorInfo((prev) => {
                          return { ...prev, city: e.target.value };
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Profile</label>
                    <input type="file" className="form-control" />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Experience</label>
                    <input
                      type="number"
                      className="form-control"
                      value={doctorInfo.experience}
                      placeholder="Total Experience In Years"
                      disabled={disabled ? true : false}
                      onChange={(e) => {
                        e.persist();
                        setDoctorInfo((prev) => {
                          return { ...prev, experience: e.target.value };
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <button
                    onClick={() => {
                      saveDoctorProfileData();
                    }}
                    className="btn btn-primary profile-button notAllowed"
                    type="button"
                    disabled={disabled ? true : false}
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DoctorProfile;
