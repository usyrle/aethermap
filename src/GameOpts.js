import React from 'react'
import axios from 'axios'
import { useTransitionHistory } from 'react-route-transition'

import './GameOpts.css'

export function GameOpts() {
    const history = useTransitionHistory()

    const requestNewDeck = () => {
        axios.post("https://aetherstream.herokuapp.com/deck/generate", {
            size: 10,
            phenomena: true,
        }).then((response) => {
            history.push(response.data.id);
        })
    }

    return (
        <div className="game-opts">
            <button className="new-game" onClick={requestNewDeck}>New Game</button>
        </div>
    )
}
