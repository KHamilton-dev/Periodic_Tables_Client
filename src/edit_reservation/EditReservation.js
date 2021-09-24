import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { editReservation, getReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function EditReservation() {
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [mobile_number, setMobileNumber] = useState(null);
  const [reservation_date, setReservationDate] = useState(null);
  const [reservation_time, setReservationTime] = useState(null);
  const [people, setPeople] = useState(null);
  const { reservation_id } = useParams();

  const [newReservationError, setNewReservationError] = useState(null);
  const history = useHistory();

  const [reservation, setReservation] = useState({});

  /* ----- useEffect & loading API data ----- */
  useEffect(() => {
    const abortController = new AbortController();

    async function loadReservation() {
      try {
        const response = await getReservation(
          reservation_id,
          abortController.signal
        );
        setReservation(response);
        setFirstName(response.first_name);
        setLastName(response.last_name);
        setMobileNumber(response.mobile_number);
        setReservationDate(response.reservation_date);
        setReservationTime(response.reservation_time);
        setPeople(response.people);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadReservation();
    return () => abortController.abort();
  }, [reservation_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await editReservation(
        reservation_id,
        {
          data: {
            first_name,
            last_name,
            mobile_number,
            reservation_date,
            reservation_time,
            people,
            status: "booked",
          },
        },
        abortController.signal
      );
      history.push(`/dashboard/?date=${reservation.reservation_date}`);
    } catch (error) {
      setNewReservationError(error);
    }
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };
  const handleReservationDateChange = (event) => {
    setReservationDate(event.target.value);
  };
  const handleReservationTimeChange = (event) => {
    setReservationTime(event.target.value);
  };
  const handlePeopleChange = (event) => {
    setPeople(Number(event.target.value));
  };

  return (
    <div className="container">
      <h1 style={{ marginTop: 15, marginBottom: 15 }}>Edit Reservation</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name:</label>
        <br />
        <input
          id="first_name"
          type="text"
          name="first_name"
          value={first_name}
          onChange={handleFirstNameChange}
          style={{ marginBottom: 5 }}
        />
        <br />
        <label htmlFor="last_name">Last Name:</label>
        <br />
        <input
          id="last_name"
          type="text"
          name="last_name"
          value={last_name}
          onChange={handleLastNameChange}
          style={{ marginBottom: 5 }}
        />
        <br />
        <label htmlFor="mobile_number">
          Mobile Number:
        </label>
        <br />
        <input
          id="mobile_number"
          type="text"
          name="mobile_number"
          value={mobile_number}
          onChange={handleMobileNumberChange}
          style={{ marginBottom: 5 }}
        />
        <br />
        <label htmlFor="reservation_date">
          Reservation Date:
        </label>
        <br />
        <input
          id="reservation_date"
          type="date"
          name="reservation_date"
          value={reservation_date}
          onChange={handleReservationDateChange}
          style={{ marginBottom: 5 }}
        />
        <br />
        <label htmlFor="reservation_time">
          Reservation Time:
        </label>
        <br />
        <input
          id="reservation_time"
          type="time"
          step="900"
          name="reservation_time"
          value={reservation_time}
          onChange={handleReservationTimeChange}
          style={{ marginBottom: 5 }}
        />
        <br />
        <label htmlFor="people">
          People:
        </label>
        <br />
        <input
          id="people"
          type="number"
          min="1"
          name="people"
          value={people}
          onChange={handlePeopleChange}
          style={{ width: 50 }}
        />
        <br/>
        <br />
        <button
          className="btn btn-success"
          style={{ marginRight: 10 }}
          type="submit"
        >
          Submit
        </button>
        <button className="btn btn-danger" onClick={() => history.goBack()}>
          Cancel
        </button>
        <br />
        <br />
        <ErrorAlert error={newReservationError} />
      </form>
    </div>
  );
}
