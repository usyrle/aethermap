import React, { useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import {
  RouteTransitionProvider,
  useTransitionHistory
} from 'react-route-transition';
import cardImages from './images';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <RouteTransitionProvider>
          <Switch>
            <Route path={`/:gameId`}>
              <GameSession />
            </Route>
            <Route path="/">
              <GameOpts />
            </Route>
          </Switch>
        </RouteTransitionProvider>
      </Router>
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
  )
}

function GameOpts() {
  const history = useTransitionHistory();

  const requestNewDeck = () => {
    axios.post("https://aetherstream.herokuapp.com/deck/generate", {
      size: 10,
      phenomena: true,
    }).then((response) => {
      history.push(response.data.id)
    })
  }

  return (
    <div className="game-opts">
      <button className="new-game" onClick={requestNewDeck}>New Game</button>
    </div>
  )
}

function GameSession() {
  const { gameId } = useParams();
  const [cardImgSrc, setCardImgSrc] = useState("");

  axios.get(`https://aetherstream.herokuapp.com/deck/${gameId}`)
    .then((response) => {
      console.log(response)
      let cardId = response.data.currentPlane.multiverseId
      console.log(cardImages[cardId].default)
      setCardImgSrc(cardImages[cardId].default)
    })

  return (
    <div class="plane-card">
      <img src={cardImgSrc} alt="the current plane" />
    </div>
  )
}

export default App;
