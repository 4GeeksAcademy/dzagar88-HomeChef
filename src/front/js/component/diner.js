import React from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";

export const Diner = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;

    return <Map />;
};


function Map() {
    const center = React.useMemo(() => ({ lat: 30.6697, lng: -81.4626 }), []);

    return (
        <div className="container">
            <div>
                <h1>Diner</h1>
                <p>Here you can search for a local "Chef"...</p>
            </div>
            <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
                <Marker position={center} />
            </GoogleMap>
        </div>
    );
}
