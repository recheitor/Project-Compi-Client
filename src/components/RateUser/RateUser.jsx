import React, { useState } from 'react';
import './RateUser.css'
import { Form, Button } from "react-bootstrap"
import ratingService from '../../services/rating.services'
import { useParams } from 'react-router-dom'


const RateUser = ({ getUserInfo }) => {
    const [rating, setRating] = useState(0);
    const [rated, setRated] = useState(0);
    const [score, setScore] = useState(
        {
            score: 0,
            comment: ''
        }
    )
    const { id } = useParams()

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
        score.referedTo = 'User'
        score.referedToId = id

        ratingService
            .createRating(score)
            .then(() => getUserInfo())
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
                <br />
                <br />
                <Form.Group className="mb-3" controlId="comment">
                    <Form.Control as="textarea" rows={3} placeholder='Comment' value={score.comment} name="comment" onChange={handleCommentInputChange} />
                </Form.Group>
                <Button type='submit' variant='dark' className='mb-4' >
                    Send
                </Button>

            </Form>
        </div>
    );
};

export default RateUser;