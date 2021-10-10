import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const GoogleMap = () => {

    const defaultProps = {
        center: {
            lat: 16.459634733648787,
            lng: 107.5805437761065
        },
        zoom: 6
    };

    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
    };
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDh41T95cnWHAUGYqCrCsWlq1Vr3dDpRbo" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals={true}
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );


}

export default GoogleMap;