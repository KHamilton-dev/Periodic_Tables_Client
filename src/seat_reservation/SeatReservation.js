import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { updateReservationStatus, seatTable } from "../utils/api";
import { listTables } from "../utils/api";

function SeatReservation() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  const { reservation_id } = useParams();
  const history = useHistory();

  useEffect(loadDashboard, []);

  function loadDashboard() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  async function handleSubmit(reservation_id) {
    const abortController = new AbortController();
    await seatTable(selectedTable, reservation_id, abortController.signal)
    await updateReservationStatus(reservation_id, "seated", abortController.signal)
      .then(() => history.push("/"))
      .catch((err) => {
        console.log(err);
      });
  }
  
  function changeHandler(event) {
    setSelectedTable(Number(event.target.value));
  }

  const mappedTables = (
    tables.map((table, index) => {
      return (
        table.reservation_id ? (
          <option key={index} value={table.table_id}>
            {table.table_name} - Occupied
          </option>
        )
        : <option key={index} value={table.table_id}>
          {table.table_name} - {table.capacity}
        </option>
      );
    })
  );

  return (
    <div className="container">
      <h1 style={{ marginTop: 15 }}>Seat Reservation</h1>
      <select name="table_id" onChange={changeHandler} style={{ marginTop: 10 }}>
        <option value="">Select a table...</option>
        {mappedTables}
      </select>
      <br />
      <br />
      <ErrorAlert error={tablesError} />
      <button
        type="submit"
        className="submitButton"
        onClick={() => handleSubmit(Number(reservation_id))}
      >
        Submit
      </button>
      <button type="button" 
      className="cancelButton"
      onClick={() => history.goBack()}>
        Cancel
      </button>
    </div>
  );
}

export default SeatReservation;
