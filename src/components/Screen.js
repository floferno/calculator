import React from 'react'
import './Screen.css'

const Screen = ({ input, output }) => {
    return (
        <div className="output">
            <span className="result">{output}</span>
            <span id="display">{input}</span>
        </div>
    )
}

export default Screen