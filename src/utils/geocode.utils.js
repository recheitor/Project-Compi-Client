import Geocode from "react-geocode"

Geocode.setApiKey(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)

const getGeocode = (label, getPlaceCoordinates) => {
    Geocode
        .fromAddress(label)
        .then(response => {
            getPlaceCoordinates(response.results[0].geometry.location)

        })
        .catch(err => console.log(err))
}

export default getGeocode
