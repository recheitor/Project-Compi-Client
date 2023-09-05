import { useState } from "react";
import { Button } from "react-bootstrap";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Geocode from "react-geocode"

function AutocompleteForm({ getPlaceCoordinates }) {

    const [place, setPlace] = useState()


    Geocode.setApiKey(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)

    console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)
    const handleButtonClick = () => {
        Geocode
            .fromAddress(place.label)
            .then(response => {

                getPlaceCoordinates(response.results[0].geometry.location)
            })
            .catch(err => console.log(err))
    }


    return (

        <div >
            <Button onClick={() => handleButtonClick()}>Accept</Button>
            <GooglePlacesAutocomplete
                selectProps={{ place, onChange: setPlace }}
                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            />
        </div >

    );
}
export default AutocompleteForm
