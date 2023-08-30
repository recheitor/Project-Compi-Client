import React, { useState } from 'react'
import './TripleCheckbox.css'

const TripleCheckbox = () => {
    const [checkboxState, setCheckboxState] = useState(0) // 0: none, 1: green, 2: red

    const handleClick = () => {
        setCheckboxState((prevState) => (prevState + 1) % 3)
    }

    const getCheckboxClassName = () => {
        if (checkboxState === 1) {
            return 'checkbox-green'
        } else if (checkboxState === 2) {
            return 'checkbox-red'
        }
        return ''
    }

    return (
        <div
            className={`custom-checkbox ${getCheckboxClassName()}`}
            onClick={handleClick}
        >
        </div>
    )
}

export default TripleCheckbox
