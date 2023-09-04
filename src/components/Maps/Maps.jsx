import React from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

const center = { lat: 40.39468593282633, lng: -3.6998868101581794 }
function Maps() {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    })

    if (!isLoaded) {
        return 'Loading'
    }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}>

                <Marker position={center} />

            </GoogleMap>

        </div>
    );
}
export default Maps
