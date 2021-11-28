import React from "react";
import "./App.css";
import { Tickets } from "./Components/tickets/Tickets";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3 style={{ fontWeight: "lighter" }}>
          Zendesk Coding Challenge - Tickets Viewer
        </h3>
      </header>

      <main
        style={{
          margin: "1rem auto",
        }}
      >
        <Tickets />
      </main>
    </div>
  );
}

export default App;
