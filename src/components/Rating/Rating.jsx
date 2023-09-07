import React, { useState } from 'react';
import './Rating.css'
import { Form, Button } from "react-bootstrap"


const Rating = ({ handleScoreInputChange }) => {
    const [rating, setRating] = useState(0);
    const [rated, setRated] = useState(0);


    const handleStarHover = (index) => {
        !rated && setRating(index + 1);
    };

    const handleStarLeave = () => {
        !rated && setRating(0);
    };

    const handleScoreInput = (score) => {
        !rated && setRated(score)
        !rated && handleScoreInputChange(score)
    }

    return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => (

                <Button key={index} onClick={() => handleScoreInput(index + 1)} onMouseLeave={handleStarLeave} className={`star ${index < rating ? 'filled' : ''}`} onMouseEnter={() => handleStarHover(index)} type="submit" >
                    &#9733;</Button>

                // </div>
            ))}
        </div>
    );
};

export default Rating;