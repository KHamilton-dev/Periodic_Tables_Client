import { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { postReservation } from "../utils/api";
import "../App.css";

function NewReservation() {
  function asDateString(date) {
    return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
      .toString(10)
      .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
  }
  const today = asDateString(new Date());

  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [mobile_number, setMobileNumber] = useState(null);
  const [reservation_date, setReservationDate] = useState(today);
  const [reservation_time, setReservationTime] = useState("10:30");
  const [people, setPeople] = useState(1);

  const [newReservationError, setNewReservationError] = useState(null);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await postReservation({
        data: {
          first_name,
          last_name,
          mobile_number,
          reservation_date,
          reservation_time,
          people,
        },
      });
      history.push(`/dashboard?date=${reservation_date}`);
    } catch (err) {
      setNewReservationError(err);
    }
  }

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };
  const handleReservationDateChange = async (event) => {
    await setReservationDate(event.target.value);
    console.log(typeof reservation_date, reservation_date)
  };
  const handleReservationTimeChange = (event) => {
    setReservationTime(event.target.value);
  };
  const handlePeopleChange = (event) => {
    setPeople(Number(event.target.value));
  };

  return (
    <div className="container">
      <h1 style={{ marginTop: 15, marginBottom: 15 }}>New Reservation</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
        <label className="col-4" htmlFor="first_name">First Name:</label>
          <input
          className="col-4"
            id="first_name"
            type="text"
            name="first_name"
            value={first_name}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="row">
        <label className="col-4" htmlFor="last_name">Last Name:</label>
          <input
           className="col-4"
            id="last_name"
            type="text"
            name="last_name"
            value={last_name}
            onChange={handleLastNameChange}
          />
        </div>
        <div className="row">
        <label className="col-4" htmlFor="mobile_number">
          Mobile Number:
        </label>
          <input
           className="col-4"
            id="mobile_number"
            type="text"
            name="mobile_number"
            value={mobile_number}
            onChange={handleMobileNumberChange}
          />
        </div>
        <div className="row">
        <label className="col-4" htmlFor="reservation_date">
          Reservation Date:
        </label>
          <input
           className="col-4"
            id="reservation_date"
            type="date"
            name="reservation_date"
            value={reservation_date}
            onChange={handleReservationDateChange}
          />
        </div>
        <div className="row">
        <label className="col-4" htmlFor="reservation_time">
          Reservation Time:
        </label>
          <input
           className="col-4"
            id="reservation_time"
            type="time"
            step="900"
            name="reservation_time"
            value={reservation_time}
            onChange={handleReservationTimeChange}
          />
        </div>
        <div className="row">
        <label className="col-4" htmlFor="people">
          People:
        </label>
          <input
           className="col-2"
            id="people"
            type="number"
            min="1"
            name="people"
            value={people}
            onChange={handlePeopleChange}
          />
        </div>
        <br/>
        <button className="submitButton" type="submit">Submit</button>
        <button className="cancelButton" type="button" onClick={() => history.goBack()}>
          Cancel
        </button>
        <br />
        <br />
        <ErrorAlert error={newReservationError} />
      </form>
    </div>
  );
}

export default NewReservation;
