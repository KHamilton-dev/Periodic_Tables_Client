import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import Reservations from "../dashboard/Reservations";

function Search() {
  const [mobile_number, setMobileNumber] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    listReservations({ mobile_number }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const ifFound = reservations.length ? (
    <Reservations reservations={reservations} />
  ) : (
    <p>No reservations found</p>
  );

  return (
    <div className="container">
      <h1 style={{ marginTop: 15 }}>Search for Reservation</h1>
      <form onSubmit={handleSubmit}>
        <input
          style={{ marginTop: 15 }}
          className="col-5"
          name="mobile_number"
          type="text"
          value={mobile_number}
          placeholder="Enter mobile number"
          onChange={handleMobileNumberChange}
        />
        <br/>
        <button className="findButton" type="submit" style={{ marginTop: 30, marginBottom: 30 }}>Find</button>
        <ErrorAlert error={reservationsError} />
        {ifFound}
      </form>
    </div>
  );
}

export default Search;
