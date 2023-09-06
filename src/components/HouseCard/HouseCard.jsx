import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GalleryCarousel from '../GalleryCarousel/GalleryCarousel'
import './HouseCard.css'

const HouseCard = ({ data }) => {

    return (
        data.address.city ?

            <div className='HouseCard'>
                <Link as={'div'} to={`/rooms/${data._id}`}>
                    <Card style={{ width: '20rem' }}>
                        <GalleryCarousel gallery={data.gallery} size={'16rem'} />
                        <Card.Body>
                            <Card.Title>{data.title}</Card.Title>
                            <Card.Text as={'div'}>
                                <p>{data.address.city}, {data.address.country}</p>
                                {
                                    data.totalScore ?
                                        <p>★ {data.totalScore}</p>
                                        :
                                        ''
                                }
                                {/* <p>★ {!data.totalScore ? ' Not rated' : data.totalScore}</p> */}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
            :
            ''
    )
}

export default HouseCard