import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GalleryCarousel from '../GalleryCarousel/GalleryCarousel'

const HouseCard = ({ data }) => {

    return (
        data.address.city ?

            <Col lg={{ span: 4 }} md={{ span: 6 }}>
                <article className='HouseCard m-3'>
                    <Card style={{ width: '20rem' }}>
                        <GalleryCarousel gallery={data.gallery} size={'16rem'} />
                        <Card.Body>
                            <Card.Title>{data.title}</Card.Title>
                            <Card.Text as='div'>
                                <p>{data.address.city}, {data.address.country}</p>
                                <p>★
                                    {
                                        !data.totalScore ? ' Not rated' : data.totalScore
                                    }
                                </p>
                            </Card.Text>
                            <Link to={`/rooms/${data._id}`} className='btn btn-dark'>Details</Link>
                        </Card.Body>
                    </Card>
                </article>
            </Col>
            :
            ''
    )
}

export default HouseCard