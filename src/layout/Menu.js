import React from "react";

import { Link } from "react-router-dom";
import "../App.css"

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <nav className="navbar navbar-dark align-items-start p-0">
      <div className="container-fluid d-flex flex-column p-0">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text">
            <h1 id="title" style={{ marginTop: 20 }}>Periodic Tables</h1>
          </div>
        </Link>

        <ul className="nav navbar-nav flex-row" style={{ marginLeft: 20 }}>
          <li className="nav-item">
            <a className="nav-link" href="/dashboard">
              <span className="oi oi-dashboard"/>
              &nbsp;Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/search">
              <span className="oi oi-magnifying-glass" />
              &nbsp;Search
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/reservations/new">
              <span className="oi oi-plus" />
              &nbsp;New Reservation
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/tables/new">
              <span className="oi oi-layers" />
              &nbsp;New Table
            </a>
          </li>
        </ul>
        
      </div>
    </nav>
  );
}

export default Menu;
