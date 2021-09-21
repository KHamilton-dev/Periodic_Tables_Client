import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { postTable } from "../utils/api";

function NewTable() {
  const [table_name, setTableName] = useState("");
  const [capacity, setCapacity] = useState(null);
  const [tableError, setTableError] = useState(null);

  const history = useHistory();

  const tableNameChangeHandler = (event) => {
    setTableName(event.target.value);
  };

  const capacityChangeHandler = (event) => {
    setCapacity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await postTable({
        data: {
          table_name,
          capacity,
        },
      });
      history.push("/");
    } catch (err) {
      setTableError(err);
    }
  };

  return (
    <div className="container">
      <h1 style={{ marginTop: 15, marginBottom: 15 }}>New Table</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
        <label className="col-4" htmlFor="table_name">Table Name: </label>
        <input
        className="col-4"
          id="table_name"
          type="string"
          name="table_name"
          value={table_name}
          onChange={tableNameChangeHandler}
        />
        </div>
        <div className="row">
        <label className="col-4" htmlFor="capacity">Capacity: </label>
        <input
         className="col-4"
          id="capacity"
          type="integer"
          name="capacity"
          value={capacity}
          onChange={capacityChangeHandler}
        />
        </div>
        <button className="submitButton" type="submit" style={{ marginTop: 15 }}>
          Submit
        </button>
        <button className="cancelButton" type="button" onClick={history.goBack}>
          Cancel
        </button>
        <br />
        <br />
        <ErrorAlert error={tableError} />
      </form>
    </div>
  );
}

export default NewTable;
