import React, { useState } from "react";
import { GoogleMap, InfoBox, Marker, useJsApiLoader } from "@react-google-maps/api";
import customMapStyle from '../../utils/mapStyle'
import { HOUSE_INITIAL_COORDS } from "../../consts/house.consts";
import { Link, useNavigate } from "react-router-dom"
import GalleryCarousel from "../GalleryCarousel/GalleryCarousel";

const center = HOUSE_INITIAL_COORDS


function Map({ houseData, zoom }) {

    const navigate = useNavigate()
    const [centerMap, setCenterMap] = useState(center);
    const [activeMarker, setActiveMarker] = useState(-1);
    const [infoDomReady, setInfoDomReady] = useState(false);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    })
    if (!isLoaded) {
        return 'Loading'
    }

    const infoBoxOpts = {
        closeBoxURL: "",
        pixelOffset: new window.google.maps.Size(-20, -30),
        alignBottom: true
    };

    const handleActiveMarker = (marker, idx) => {
        if (idx === activeMarker) {
            return;
        }
        setActiveMarker(idx);
        // setCenterMap(marker)
    };



    const handleInfoBoxClick = (house_id) => {
        navigate(`/rooms/${house_id}`)
    }

    return (
        <GoogleMap
            zoom={zoom}
            center={centerMap}
            // onClick={() => setActiveMarker(-1)}
            mapContainerStyle={{ width: "100vw", height: "80vh" }}
            options={{ styles: customMapStyle }}
        >
            {
                houseData.map(({ location, price, _id, gallery }, idx) => {
                    return (
                        < Marker
                            key={idx}
                            position={location.coordinates}
                            onMouseOver={() => handleActiveMarker(location.coordinates, idx)}
                            label={`${price.housePrice.toString()}€`}
                            icon={{
                                url: 'https://res.cloudinary.com/dbtmrinwa/image/upload/v1693989316/rjuqeritzuuomp0cnuyj.png',
                                scaledSize: new window.google.maps.Size(50, 25)
                            }}
                        >
                            {
                                activeMarker == idx ?
                                    (
                                        <InfoBox
                                            options={infoBoxOpts}
                                        // onClick={() => handleInfoBoxClick(_id)}


                                        >
                                            <Link as={'div'} to={`/rooms/${_id}`}>
                                                <div style={{ width: '130px', height: '100px' }}>
                                                    <GalleryCarousel gallery={gallery} size={'100px'} />

                                                </div>
                                            </Link>
                                        </InfoBox>
                                    )
                                    :
                                    null
                            }
                        </Marker>
                    )
                })
            }
        </GoogleMap >
    );
}
export default Map;