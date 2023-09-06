import React, { useState } from "react";
import { GoogleMap, InfoBox, Marker, useJsApiLoader } from "@react-google-maps/api";
import customMapStyle from './mapStyle'
import './Map.css'


const center = { lat: 40.3930, lng: -3.70357777 }

function Map({ houseData }) {

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
        setCenterMap(marker)
    };

    const handleInfoCloseClick = () => {
        setActiveMarker(-1);
        setInfoDomReady(false);
    };


    return (
        <GoogleMap
            zoom={10}
            center={centerMap}
            onClick={() => setActiveMarker(-1)}
            mapContainerStyle={{ width: "50vw", height: "50vh" }}
            options={{ styles: customMapStyle }}
        >

            {
                houseData.map(({ location, price }, idx) => {
                    return (
                        < Marker
                            key={idx}
                            position={location.coordinates}
                            onClick={() => handleActiveMarker(location.coordinates, idx)}
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
                                            onCloseClick={handleInfoCloseClick}
                                        >
                                            <div style={{ width: '100px', height: '100px' }}>
                                                <img onClick={() => alert('hi')} src="https://res.cloudinary.com/dbtmrinwa/image/upload/v1693865957/rt7uihukf3qkujwcx8yw.avif" style={{ width: '100px', height: '100px', borderRadius: '10px' }} alt="" />
                                            </div>
                                        </InfoBox>
                                    )
                                    :
                                    null
                            }
                        </Marker>
                    )
                })

            }
            {/* <Marker
                position={coords[0]}
                onClick={() => handleActiveMarker(0)}
                label={{
                    text: price,
                    className: 'marker-label'
                }}
                icon={{
                    url: 'https://res.cloudinary.com/dbtmrinwa/image/upload/v1693989316/rjuqeritzuuomp0cnuyj.png',
                    scaledSize: new window.google.maps.Size(50, 25)
                }}
            >
                {
                    activeMarker === 0 ?
                        (
                            <InfoBox
                                options={infoBoxOpts}

                                onCloseClick={handleInfoCloseClick}

                            >

                                <div style={{ width: '100px', height: '100px' }}>
                                    <img onClick={() => alert('hi')} src="https://res.cloudinary.com/dbtmrinwa/image/upload/v1693865957/rt7uihukf3qkujwcx8yw.avif" style={{ width: '100px', height: '100px', borderRadius: '10px' }} alt="" />
                                </div>

                            </InfoBox>
                        )
                        :
                        null
                }
            </Marker> */}

            {/* <Marker
                position={coords[1]}
                onClick={() => handleActiveMarker(1)}
                label={{
                    text: price,
                    className: 'marker-label'
                }}
                icon={{
                    url: 'https://res.cloudinary.com/dbtmrinwa/image/upload/v1693989316/rjuqeritzuuomp0cnuyj.png',
                    scaledSize: new window.google.maps.Size(50, 25)
                }}
            >
                {
                    activeMarker === 1 ?
                        (
                            <InfoBox
                                options={infoBoxOpts}
                                // onClick={() => alert('hi')}
                                onCloseClick={handleInfoCloseClick}

                            >

                                <div style={{ width: '100px', height: '100px' }}>
                                    <img onClick={() => alert('hi')} src="https://res.cloudinary.com/dbtmrinwa/image/upload/v1693865957/rt7uihukf3qkujwcx8yw.avif" style={{ width: '100px', height: '100px', borderRadius: '10px' }} alt="" />
                                </div>

                            </InfoBox>
                        )
                        :
                        null
                }
            </Marker> */}

            {/* <MarkerF position={coords[1]} onClick={() => handleActiveMarker(1)}>
                {activeMarker === 1 ? (
                    <InfoWindow
                        onDomReady={() => setInfoDomReady(true)}
                        onUnmount={() => setInfoDomReady(false)}
                        onCloseClick={handleInfoCloseClick}
                    >
                    </InfoWindow>
                ) : null}
            </Marker> */}
        </GoogleMap >




    );
}

export default Map;
