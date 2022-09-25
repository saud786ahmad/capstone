import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./ViewSchedule.css";
import CreateSchedule from "../CreateSchedule/CreateSchedule";
import Swal from "sweetalert2";

const host = "http://34.194.140.31:8080";

export default function ViewSchedule() {
  const doctorEmail = JSON.parse(localStorage.getItem("doctorEmail"));
  const month =
  new Date().getMonth() + 1 < 10
  ? "0" + (new Date().getMonth() + 1)
  : new Date().getMonth() + 1;
  const currentdate = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
  const todaydate =
  new Date().getFullYear() + "-" + month + "-" + currentdate;
  const [changeDate, setchangeDate] = useState(todaydate);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ScheduleInfo, setScheduleInfo] = useState();
  useEffect(() => {
    setchangeDate(todaydate)
    console.log('viewSchedulereset')
    const scheduleDate = todaydate;
    axios.get(
      `${host}/appointmentservice/api/v1/schedules/schedule/${doctorEmail}/${scheduleDate}`
      // `http://localhost:3001/schedules/6`
      ).then((res) => {
        const schedule = res.data;
        console.log(typeof(schedule));
        setScheduleInfo(schedule);
      });
  }, [isModalOpen]);
  // if(Array.isArray(ScheduleInfo)){
  //   return <div className="col-9" id="error">There was an error loading your data!</div>
  // }

  // useEffect(() => {
  //   console.log('viewSchedulereset')
  //   setchangeDate(todaydate)
  // }, [isModalOpen])

  function showschedule(e) {
    const scheduleDate = e.target.value;
    console.log(scheduleDate);
    setchangeDate(scheduleDate);
    // console.log(changeDate);
    if (scheduleDate !== "") {
      axios
        .get(
          `${host}/appointmentservice/api/v1/schedules/schedule/doctor/all/${doctorEmail}/${scheduleDate}`
          // `http://localhost:3001/schedules/6`
        )
        .then((res) => {
          const schedule = res.data;
          console.log(schedule);
          setScheduleInfo(schedule);
          if (res.status == 201 || res.status == 304 || res.status == 200) {
            console.log("Schedule Successfully fetched");
          }
        });
    }
  }

  function deleteSchedule(info) {
    const obj = {};
    // const arr = [];
    const scheduleDate = info.scheduleDate;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (!result.isConfirmed) {
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
        return;
      }else{

     
    // if (dialog == false) {
    // return;
    // }
    // const date = changeDate;
    // const starttime = info.startTime;
    // const endtime = info.endTime;
    // const schedule = res.data;
    // console.log(schedule);

    obj.scheduleId = info.scheduleId;
    obj.doctorEmail = doctorEmail;
    obj.scheduleDate = info.scheduleDate;
    obj.startTime = info.startTime;
    obj.endTime = info.endTime;
    obj.scheduleStatus = "NOT_AVAILABLE";
    // arr.push(obj);
    console.log(obj);

    // for (let i = 0; i < arr.length; i++) {
      axios
        .put(
          `${host}/appointmentservice/api/v1/schedules/schedule`,
          obj
          // `http://localhost:3001/schedules/${6}`, arr[i]
        )
        .then(
          (response) => {
            // let scheduleDate = changeDate;
            axios
            .get(
              `${host}/appointmentservice/api/v1/schedules/schedule/doctor/all/${doctorEmail}/${scheduleDate}`
              // `http://localhost:3001/schedules/6`
            )
            .then((res) => {
              const schedule = res.data;
              console.log(schedule);
              setScheduleInfo(schedule);
              if (res.status == 201 || res.status == 304 || res.status == 200) {
                console.log("Schedule Successfully fetched");
              }
            });


            if (
              response.status == 201 ||
              response.status == 304 ||
              response.status == 200
            ) {
              // alert("Delete Schedule");
              console.log(response);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    // }
 }
    })
  }

  return (
    <>
    {/* {console.log(isModalOpen)} */}
      <div className="col-md-9" id="col-2">
        <div className="main">
          <div className="schedule">
            <label>
              <h1>Schedule Timings</h1>
            </label>
          </div>
          <br />
          <div className="row" id="row-2">
            <div className="col-6" id="select-1">
              <h5>Select Date:</h5>
            </div>
            <div className="col-7" id="date-1">
              <input className="form-control" type="date" id="date" value={changeDate} min={todaydate} onChange={(e) => showschedule(e)} />
            </div>
          </div>
          <table className="table table-bordered" id="schedule_table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ScheduleInfo ? ScheduleInfo.map((info) => (
                <tr>
                  <td>{info.scheduleDate}</td>
                  <td>{info.startTime}</td>
                  <td>{info.endTime}</td>
                  <td>{info.scheduleStatus}</td>
                  <td>
                    <i
                      className="fa-solid fa-trash fa-xl"
                      onClick={() => { deleteSchedule(info) }} />
                  </td>
                </tr>
              )) : <tr><td colSpan="5">Nothing to display</td></tr>}
            </tbody>
          </table>
          <div>
            <div id="create-1">
              <button
                type="button"
                id="create"
                className="btn btn-danger"
                data-bs-toggle="modal" data-bs-target="#exampleModal"
                onClick={() => setIsModalOpen(true)}
              >
                Create Schedule
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" id="modal-view">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="exampleModalLabel-header">Create Schedule</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setIsModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              <CreateSchedule isModalOpen={isModalOpen} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// export default ViewSchedule;
