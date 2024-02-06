import React, { StrictMode } from "react";
import "./App.css";
import { Game } from "./Game";
import { createRoot } from "react-dom/client";

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <StrictMode>
    <Game />
  </StrictMode>
);
