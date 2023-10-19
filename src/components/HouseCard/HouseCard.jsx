import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GalleryStaticCarousel from '../GalleryStaticCarousel/GalleryCarousel';
import './HouseCard.css';

const HouseCard = ({ data }) => {
  return data.address.city ? (
    <div className="HouseCard mb-3">
      <Link as={'div'} to={`/rooms/${data._id}`}>
        <Card style={{ width: '16rem' }} className="mx-auto">
          <GalleryStaticCarousel gallery={data.gallery} size={'16rem'} />
          <Card.Body style={{ height: '150px' }}>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text as={'div'}>
              <p>
                {data.address.city}, {data.address.country}
              </p>
              <div style={{ position: 'absolute', bottom: '0' }}>
                {data.totalScore ? <p>★ {data.totalScore}</p> : <p>★ Not Rated</p>}
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
  ) : (
    ''
  );
};

export default HouseCard;
