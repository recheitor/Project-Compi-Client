import { Row } from 'react-bootstrap'
import AmenityCard from '../AmenityCard/AmenityCard'

const AmenitiesList = ({ amenities }) => {

    return (
        !amenities ?
            <h1>Loading...</h1>
            :
            <>
                <Row>
                    {
                        amenities.map(elm => <AmenityCard key={elm._id} {...elm} />)
                    }
                </Row>
            </>
    )
}

export default AmenitiesList