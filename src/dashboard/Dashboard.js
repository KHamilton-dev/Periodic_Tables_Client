import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import Reservations from "./Reservations";
import Tables from "./Tables";
import "../App.css";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const dateObj = new Date(date);
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const day = (dateObj.getDay() === 6) ? "Sunday" : days[dateObj.getDay() + 1];
  const month = months[dateObj.getMonth()];

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  return (
    <main className="container">
      <br />
      <h1
        className="row justify-content-center"
        style={{ marginBottom: 25 }}
      >
        Dashboard
      </h1>
      <div className="dateButtonGroup">
        <button
          className="btn btn-success"
          onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
        >
          Previous
        </button>
        <button 
        className="btn btn-primary" 
        onClick={() => history.push("/")}>
          Today
        </button>
        <button
          className="btn btn-success"
          onClick={() => history.push(`/dashboard?date=${next(date)}`)}
        >
          Next
        </button>
      </div>
      <br />
      <h4 style={{ marginBottom: 10 }}>{day}, {month} {dateObj.getDate() + 1}</h4>
      <div className="reservationsAndTables">
        <div className="col-sm-6">
          <hr />
          <h4 justify-content="center">Reservations</h4>
          <ErrorAlert error={reservationsError} />
          <Reservations reservations={reservations} />
          <hr />
        </div>
        <div className="col-sm-1"></div>
        <div className="col-sm-5">
          <hr />
          <h4 justify-content="center">Tables</h4>
          <hr />
          <ErrorAlert error={tablesError} />
          <Tables tables={tables} />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
