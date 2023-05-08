import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import CryptoContext from "./components/ui/Tredingcoin/CryptoContext";
import App from "./App";
import 'react-alice-carousel/lib/alice-carousel.css';
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
ReactDOM.render(
  <>
    <CryptoContext>
    <Router>
      <App />
    </Router>
    </CryptoContext>
  </>,
  document.getElementById("root")
);
