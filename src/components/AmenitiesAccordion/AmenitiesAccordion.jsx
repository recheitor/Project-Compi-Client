import Accordion from 'react-bootstrap/Accordion';
import amenityService from '../../services/amenity.services';
import { useEffect, useState } from 'react';
import AmenitiesList from '../AmenitiesList/AmenitiesList';

function AmenitiesAccordion() {

    const [amenities, setAmenities] = useState()

    useEffect(() => {
        loadAmenities()
    }, [])

    const loadAmenities = () => {
        amenityService
            .getAllAmenities()
            .then(({ data }) => setAmenities(data))
            .catch(err => console.log(err))
    }

    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Amenities</Accordion.Header>
                <Accordion.Body>
                    <AmenitiesList amenities={amenities} />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default AmenitiesAccordion