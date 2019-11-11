import React from "react";
import ReactDOM from "react-dom";
import { AppWithRouter } from "./with-router";
import { AppWithoutRouter } from "./without-router";
import { pathponents } from "./pathponents";
import Poker from "./poker";
import FirebaseTest from "./firebase";

import "./styles.css";

if (typeof String.prototype.trim === "undefined") {
  String.prototype.trim = function() {
    return String(this).replace(/^\s+|\s+$/g, "");
  };
}

const rootElement = document.getElementById("root");
// ReactDOM.render(<AppWithRouter pathponents={pathponents} />, rootElement);

ReactDOM.render(<Poker />, rootElement);
