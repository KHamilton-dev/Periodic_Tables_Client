import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "../App.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div id="main-container" className="container-fluid d-flex bg">
      <div className="row flex-fill">
        <div className="col-md-2 side-bar" style={{ paddingBottom: 30 }}>
          <Menu />
        </div>
        <div id="routes-div" className="col">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
