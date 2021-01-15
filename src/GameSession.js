import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom"
import { useTransitionHistory } from 'react-route-transition'
import BeatLoader from "react-spinners/BeatLoader";
import cardImages from './cards/images'

import './GameSession.css'

export function GameSession() {
    const { gameId } = useParams()
    const history = useTransitionHistory()
    const [cardImgSrc, setCardImgSrc] = useState("")
    const [loading, setLoading] = useState(false)
    const [nextButtonText, setNextButtonText] = useState('Next Plane')

    const gameUrl = `https://aetherstream.herokuapp.com/deck/${gameId}`

    const getGameInfo = () => {
        axios.get(gameUrl)
        .then((response) => {
            let cardId = response.data.currentPlane.multiverseId;
            setCardImgSrc(cardImages[cardId].default);
        })
    }

    const goHome = () => {
        history.push('/')
    }

    const getNext = () => {
        setNextButtonText('')
        setLoading(true)

        axios.post(`${gameUrl}/next`)
        .then((response) => {
            let cardId = response.data.currentPlane.multiverseId;
            setCardImgSrc(cardImages[cardId].default);
            setLoading(false)
            setNextButtonText('Next Plane')
        })
    }

    useEffect(() => {
        getGameInfo()
        const interval = setInterval(() => {getGameInfo()}, 60000);
        return () => clearInterval(interval);
    });

    return (
        <div className="game-session">
            <div className="button-row">
                <button className="home-button" onClick={goHome}>Home</button>
                <button className="next-button" onClick={getNext}>
                    <BeatLoader color="#DCDCDC" loading={loading} size={10}/>
                    {nextButtonText}
                </button>
            </div>
            <div className="plane-card">
                <img src={cardImgSrc} alt="current plane" />
            </div>
        </div>
    )
}
