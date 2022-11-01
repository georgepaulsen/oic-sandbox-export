import "./styles.css";
import React from "react";
import { Report } from "./Components/Report";
import { CurrentBoard } from "./Components/CurrentBoard";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>OIC Vestaboard Control Panel</h2>
        <Report />
        <h2>Current Board</h2>
        <CurrentBoard />
      </header>
    </div>
  );
}
