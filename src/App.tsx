import React, { StrictMode } from "react";
import "./App.css";
import { Game } from "./game/Game";
import { createRoot } from "react-dom/client";
import { Background } from "./background/Background";

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <StrictMode>
    <Game />
  </StrictMode>
);
