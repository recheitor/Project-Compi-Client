import Geocode from "react-geocode"

Geocode.setApiKey('AIzaSyCIkt_MWj32EbnKrxghvdDSFRzxDfC4uMs')

const geocode = ({ label }) => {
    Geocode
        .fromAddress(label)
        .then(response => {
            return response.results[0].geometry.location

        })
        .catch(err => console.log(err))
}

export default geocode
