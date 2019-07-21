import React from "react";
import "./App.css";

import { Game } from "./components/game/game.component";

const App: React.FC = () => {
  return (
    <div className="App-container">
      <div className="App-content">
        <h1>Set Game</h1>
        <Game />
      </div>
    </div>
  );
};

export default App;
