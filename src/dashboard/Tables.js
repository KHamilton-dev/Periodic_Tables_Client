import React from "react";
import { useHistory } from "react-router";
import { clearTable, updateReservationStatus } from "../utils/api";

function Tables({ tables }) {
  const history = useHistory();

  async function finishButton(table) {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      try {
        const abortController = new AbortController();
        await updateReservationStatus(table.reservation_id, "finished", abortController.signal)
        await clearTable(table.table_id, abortController.signal);
        history.go(0);
      } catch (err) {
        console.log(err);
      }
    }
  }

  let sortedTables = (
    <div>
      <p>No tables found.</p>
    </div>
  );

  if (tables.length) {
    sortedTables = tables.map((table, index) => {
      return (
        <div key={index}>
          <hr />
          <h6>Table: {table.table_name}</h6>
          {table.reservation_id ? (
            <div>
              <h6 data-table-id-status={table.table_id}>
                Occupied</h6>
              <button
                className="btn btn-info"
                data-table-id-finish={table.table_id}
                style={{ marginTop: 5 }}
                onClick={() => finishButton(table)}
              >
                Clear
              </button>
            </div>
          ) : (
            <h6 data-table-id-status={table.table_id}>Free</h6>
          )}
        </div>
      );
    });
  }

  return sortedTables;
}

export default Tables;
