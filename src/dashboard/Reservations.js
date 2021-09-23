import React from "react";
import { useHistory } from "react-router";
import { editReservation } from "../utils/api";
import "../App.css"

function Reservations({ reservations }) {
  const history = useHistory();

  const cancelClickHandler = async (reservation) => {
    const {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    } = reservation;
    if (window.confirm("Do you want to cancel this reservation?")) {
      try {
        const abortController = new AbortController();
        await editReservation(
          reservation.reservation_id,
          {
            data: {
              first_name,
              last_name,
              mobile_number,
              reservation_date,
              reservation_time,
              people,
              status: "cancelled",
            },
          },
          abortController.signal
        );
        history.push(`/reservations/?date=${reservation.reservation_date}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return reservations.length ? (
    reservations.map((reservation, index) => {
      if (
        reservation.status !== "finished" &&
        reservation.status !== "cancelled"
      )
        return (
          <div key={reservation.reservation_id}>
            <hr />
            <div className="row align-items-center" style={{ marginTop: 25 }}>
              <div className="col-6">
                <h5>
                  {reservation.first_name} {reservation.last_name}{" "}
                  {reservation.reservation_time.slice(0, -3)}
                </h5>
                <h5>Party of {reservation.people}</h5>
                <h5 data-reservation-id-status={reservation.reservation_id} style={{ marginTop: 30 }}>
                   {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)} 
                </h5>
              </div>
              {reservation.status === "booked" ? (
                <div className="col-3">
                  <div className="row">
                    <button
                      className="btn btn-success"
                      style={{ marginBottom: 5 }}
                      onClick={() =>
                        history.push(
                          `/reservations/${reservation.reservation_id}/seat`
                        )
                      }
                    >
                      Seat
                    </button>
                  </div>
                  <div className="row">
                    <button
                      className="btn btn-warning"
                      style={{ marginBottom: 5 }}
                      onClick={() =>
                        history.push(
                          `/reservations/${reservation.reservation_id}/edit`
                        )
                      }
                    >
                      Edit
                    </button>
                  </div>
                  <div className="row">
                    <button
                      className="btn btn-danger"
                      style={{ marginBottom: 5 }}
                      data-reservation-id-cancel={reservation.reservation_id}
                      onClick={() => cancelClickHandler(reservation)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        );
      else {
        return (
          // <div key={reservation.reservation_id}>
          //   <hr />
          //   <p>
          //     Reservation for {reservation.first_name} {reservation.last_name}{" "}
          //     completed.
          //   </p>
          // </div>
          <></>
        )
      };
    })
  ) : (
    <div>
      <hr />
      <h6 className="d-flex justify-content-center">No Reservations</h6>
    </div>
  );
}

export default Reservations;
