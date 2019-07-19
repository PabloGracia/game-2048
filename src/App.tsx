import React from "react";
import "./App.css";

import { Game } from "./components/game/game.component";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Set Game</h1>
      <Game />
    </div>
  );
};

export default App;
