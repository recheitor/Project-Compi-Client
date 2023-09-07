import { Link, useNavigate } from 'react-router-dom';
import './Ratings.css'



const Rating = ({ rating }) => {
    const { score, comment, userId } = rating
    const { firstName, lastName, _id } = userId


    const navigate = useNavigate();



    return (

        <div className="rating-card">
            <p>&#9733;{score}</p>
            <p>Comment: {comment}</p>
            <Link to={`/user/${_id}`}>User: {firstName}{lastName}</Link>


        </div>
    );
};

export default Rating;