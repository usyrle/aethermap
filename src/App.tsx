import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="game-opts">
        <button className="new-game">New Game</button>
      </div>
      <footer>
        <div className="source-links">
          <p><a href="https://github.com/usyrle/aethermap/">Aethermap source code</a></p>
          <p><a href="https://github.com/usyrle/aetherstream/">Aetherstream (API) source code</a></p>
        </div>
        <div className="fan-policy">
          <p>Aethermap is unofficial Fan Content permitted under the Fan Content Policy. Not approved/endorsed by Wizards.</p>
          <p>Portions of the materials used are property of Wizards of the Coast.</p>
          <p>©Wizards of the Coast LLC.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
