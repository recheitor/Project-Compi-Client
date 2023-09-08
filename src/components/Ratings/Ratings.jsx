import { Link, useNavigate } from 'react-router-dom';
import './Ratings.css'

const Rating = ({ rating }) => {
    const navigate = useNavigate();
    const { score, comment, userId } = rating
    const { firstName, lastName, _id, avatar } = userId

    return (
        <div className="rating-card">
            <h2>&#9733; {score} · <Link to={`/user/${_id}`}><img src={avatar} style={{ height: '2rem', width: '2rem', borderRadius: '50rem' }} /> {firstName} {lastName}</Link></h2>
            <p>{comment}</p>
        </div>
    )
}
export default Rating;