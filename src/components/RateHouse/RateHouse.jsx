import React, { useState } from 'react';
import './RateHouse.css'
import { Form, Button } from "react-bootstrap"
import ratingService from '../../services/rating.services'
import { useParams } from 'react-router-dom'


const Rate = ({ getHouseRoomForm }) => {
    const [rating, setRating] = useState(0);
    const [rated, setRated] = useState(0);
    const [score, setScore] = useState(
        {
            score: 0,
            comment: ''
        }
    )
    const { rooms_house_id } = useParams()
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

    const handleScoreFormSubmit = e => {
        e.preventDefault()
        score.referedTo = 'House'
        score.referedToId = rooms_house_id

        ratingService
            .createRating(score)
            .then(() => getHouseRoomForm())
            .catch(err => console.log(err))

    }

    const handleScoreInputChange = value => setScore({ ...score, score: value })

    const handleCommentInputChange = e => {
        const { value, name } = e.currentTarget
        setScore({ ...score, [name]: value })

    }

    return (

        <div className="star-rating">
            <Form onSubmit={handleScoreFormSubmit}>
                {[...Array(5)].map((_, index) => (
                    <>
                        <div style={{ display: 'inline-block' }}
                            key={index}
                            className={`star ${index < rating ? 'filled' : ''}`}
                            onMouseEnter={() => handleStarHover(index)}
                            onMouseLeave={handleStarLeave}
                            onClick={() => handleScoreInput(index + 1)}
                        >
                            &#9733;
                        </div>

                    </>

                ))}
                <Form.Group className="mb-3" controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control type="text" value={score.comment} name="comment" onChange={handleCommentInputChange} />
                </Form.Group>
                <Button type='submit' >
                    Confirmar
                </Button>

            </Form>
        </div>
    );
};

export default Rate;