import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom"
import { useTransitionHistory } from 'react-route-transition'
import cardImages from './cards/images'

import './GameSession.css'

export function GameSession() {
    const { gameId } = useParams()
    const [cardImgSrc, setCardImgSrc] = useState("")
    const history = useTransitionHistory()

    const gameUrl = `https://aetherstream.herokuapp.com/deck/${gameId}`

    const goHome = () => {
        history.push('/')
    }

    const getNext = () => {
        setCardImgSrc(getNextPlane(gameUrl))
    }

    axios.get(gameUrl)
        .then((response) => {
            let cardId = response.data.currentPlane.multiverseId;
            setCardImgSrc(cardImages[cardId].default);
        })

    return (
        <div className="game-session">
            <div className="button-row">
                <button className="home-button" onClick={goHome}>Home</button>
                <button className="next-button" onClick={getNext}>Next Plane</button>
            </div>
            <div className="plane-card">
                <img src={cardImgSrc} alt="current plane" />
            </div>
        </div>
    )
}

async function getNextPlane(url) {
    let response = await axios.post(`${url}/next`)
    return response.data.currentPlane.multiverseId
}
