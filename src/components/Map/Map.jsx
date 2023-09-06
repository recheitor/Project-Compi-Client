import React, { useState } from "react";
import { GoogleMap, InfoBox, InfoWindow, MarkerF, Marker } from "@react-google-maps/api";
import customMapStyle from './mapStyle'

const center = { lat: 40.3930, lng: -3.70357777 }
const price = '150'
const coords = [
    { lat: 40.3930, lng: -3.70357777 },
    { lat: 40.3930, lng: -3.76035777 }
];

const slides = Array.from(Array(5).keys());

function Map() {
    const [activeMarker, setActiveMarker] = useState(-1);
    const [infoDomReady, setInfoDomReady] = useState(false);

    const infoBoxOpts = {
        closeBoxURL: "",
        infoBoxClearance: new window.google.maps.Size(24, 24),
        pixelOffset: new window.google.maps.Size(-150, -60),
        alignBottom: true
    };

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const handleInfoCloseClick = () => {
        setActiveMarker(-1);
        setInfoDomReady(false);
    };

    return (
        <GoogleMap
            zoom={11}
            center={center}
            // onClick={() => setActiveMarker(-1)}
            mapContainerStyle={{ width: "100vw", height: "100vh" }}
            options={{ styles: customMapStyle }}
        >
            <Marker
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
            </Marker>

            <Marker
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
            </Marker>

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
        </GoogleMap>




    );
}

export default Map;
