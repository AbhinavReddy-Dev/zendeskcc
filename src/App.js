import React from "react";
import "./App.css";
import { Tickets } from "./tickets/Tickets";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3 style={{ fontWeight: "lighter" }}>
          Zendesk Coding Challenge - Tickets Viewer
        </h3>
      </header>

      <Tickets />
    </div>
  );
}

export default App;
