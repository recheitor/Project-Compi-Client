import { useState } from "react";
import { Button } from "react-bootstrap";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Geocode from "react-geocode"
import getGeocode from "../../utils/geocode.utils";


function AutocompleteForm({ getPlaceCoordinates }) {

    const [place, setPlace] = useState()

    Geocode.setApiKey(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)

    const handleAutoComplete = () => {
        if (place) {
            getGeocode(place.label, getPlaceCoordinates)
        }
    }

    return (
        <GooglePlacesAutocomplete
            selectProps={{ place, onChange: setPlace }}
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            onChange={handleAutoComplete()}
        />
    );
}
export default AutocompleteForm
