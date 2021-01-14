import React, { useState } from 'react'
import axios from 'axios'
import { useTransitionHistory } from 'react-route-transition'

import './GameOpts.css'

export function GameOpts() {
    const history = useTransitionHistory()
    const [size, setSize] = useState(10)
    const [phenomena, setPhenomena] = useState(true)

    const requestNewDeck = () => {
        axios.post("https://aetherstream.herokuapp.com/deck/generate", {
            size: size,
            phenomena: phenomena,
        }).then((response) => {
            history.push(response.data.id)
        })
    }

    const handleSizeChange = (event) => {
        setSize(event.target.value)
    }

    const handlePhenomChange = (event) => {
        setPhenomena(event.target.value)
    }

    return (
        <div className="game-opts">
            <div className="button-row">
                <button className="new-game" onClick={requestNewDeck}>New Game</button>
            </div>
            <div className="game-opts-content">
                <div>
                    <label for="deck-size" className="form-label">Deck size</label>
                    <input name="deck-size" type="number" placeholder={size} onChange={handleSizeChange}/>
                </div>
                <div onChange={handlePhenomChange}>
                    <label for="phenom-choice" className="form-label">Add phenomena?</label>
                    <label for="phenom-yes">Yes</label>
                    <input name="phenom-choice" id="phenom-yes" type="radio" value="true" defaultChecked/>
                    <label for="phenom-no">No</label>
                    <input name="phenom-choice" id="phenom-no" type="radio" value="false"/>
                </div>
            </div>
            <div className="about">
                <p>Aethermap lets you generate and share a Planechase game with your friends!</p>
                <p>Click on <strong>New Game</strong> above to get started, then share the link.</p>
                <p>Everyone will see the same plane, and anyone can click <strong>Next Plane</strong> when they roll to planeswalk.</p>
            </div>
        </div>
    )
}
