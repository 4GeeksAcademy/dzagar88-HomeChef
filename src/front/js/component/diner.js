import React, { useState } from "react";
import { useLoadScript, GoogleMap, Marker, Circle } from "@react-google-maps/api";

const libraries = ["places"];

export const Diner = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [searchZip, setSearchZip] = useState("");
    const [center, setCenter] = useState({ lat: 30.6697, lng: -81.4626 });

    const handleSearch = () => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: searchZip }, (results, status) => {
            if (status === "OK" && results.length > 0) {
                const location = results[0].geometry.location;
                setCenter({ lat: location.lat(), lng: location.lng() });
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="container">
            <div>
                <h1>Diner</h1>
                <p>Here you can search for a local "Chef"...</p>
                <input
                    type="text"
                    value={searchZip}
                    onChange={(e) => setSearchZip(e.target.value)}
                    placeholder="Enter ZIP code"
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
                <Marker position={center} />
                <Circle
                    center={center}
                    radius={10 * 1609.34} // Convert 10 miles to meters
                    options={{
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: "#FF0000",
                        fillOpacity: 0.35,
                    }}
                />
            </GoogleMap>
        </div>
    );
};
