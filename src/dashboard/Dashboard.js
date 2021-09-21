import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import Reservations from "./Reservations";
import Tables from "./Tables";
import "./Dashboard.css";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  console.log(date);
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
      <h1 className="row justify-content-center" style={{ marginBottom: 25 }}>Dashboard</h1>
      <div className="dateButtonGroup">
        <button
          className="dateButton"
          onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
        >
          Previous
        </button>
        <button 
        className="dateButton" 
        onClick={() => history.push("/")}>
          Today
        </button>
        <button
          className="dateButton"
          onClick={() => history.push(`/dashboard?date=${next(date)}`)}
        >
          Next
        </button>
      </div>
      <br />
      <h4 style={{ marginBottom: 30 }}>Reservations for {date}</h4>
      <ErrorAlert error={reservationsError} />
      <Reservations reservations={reservations} />
      <hr />
      <h4 justify-content="center">Tables</h4>
      <ErrorAlert error={tablesError} />
      <Tables tables={tables} />
    </main>
  );
}

export default Dashboard;
