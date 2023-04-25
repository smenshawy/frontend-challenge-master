import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.scss";

window.FinancingCostWidget = (config) => {
  const { elementId, ...rest } = config;
  const root = ReactDOM.createRoot(document.getElementById(elementId));
  root.render(<App config={rest} />);
  return this;
};