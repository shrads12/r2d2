import React, { StrictMode } from "react";
import "./App.css";
import { Game } from "./Game";
import { createRoot } from "react-dom/client";
import { Background } from "./Background/Background";

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <StrictMode>
    <div className="main">
      <Background />
      <h1>Jedi Quest!</h1>
      <h2>
        Embark on a space adventure, collect the lightsaber, and capture Vaders
        to win! Beware of fiery obstacles. Each victory earns Jedi stars for a
        special surprise! May the Force be with you!
      </h2>
      <Game />
    </div>
  </StrictMode>
);
