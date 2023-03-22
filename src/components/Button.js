import React from 'react'
import './Button.css'

const Button = ({ keyData: { id, value }, handleInput }) => {
    return (
        <button id={id} onClick={() => handleInput(value)}>{value}</button>
    )
}

export default Button