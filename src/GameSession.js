import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom"
import cardImages from './cards/images'

import './GameSession.css'

export function GameSession() {
    const { gameId } = useParams()
    const [cardImgSrc, setCardImgSrc] = useState("")

    axios.get(`https://aetherstream.herokuapp.com/deck/${gameId}`)
        .then((response) => {
            console.log(response);
            let cardId = response.data.currentPlane.multiverseId;
            console.log(cardImages[cardId].default);
            setCardImgSrc(cardImages[cardId].default);
        })

    return (
        <div class="plane-card">
            <img src={cardImgSrc} alt="current plane" />
        </div>
    )
}
