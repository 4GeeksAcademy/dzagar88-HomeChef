import React, { useState } from "react";
import { useLoadScript, GoogleMap, Marker, Circle } from "@react-google-maps/api";
import homechefBG from "../../img/homechefBG.jpg"

const libraries = ["places"];

export const Diner = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [searchAddress, setSearchAddress] = useState({
        street: "",
        city: "",
        state: ""
    });
    const [center, setCenter] = useState({ lat: 30.6697, lng: -81.4626 });

    const handleSearch = () => {
        const address = `${searchAddress.street}, ${searchAddress.city}, ${searchAddress.state}`;
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK" && results.length > 0) {
                const location = results[0].geometry.location;
                setCenter({ lat: location.lat(), lng: location.lng() });
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="container d-flex lower-font">
            <div><br></br>
                <h1 className="d-flex justify-content-center me-2 title-font white-title brown-bg">Diner</h1>
                <p className="d-flex justify-content-center me-2 lower-font white-title brown-bg">Here you can search for a local "Chef"...</p>
                <input
                    className="me-1 mb-1"
                    type="text"
                    value={searchAddress.street}
                    onChange={(event) => setSearchAddress({ ...searchAddress, street: event.target.value })}
                    placeholder="Street"
                /><br></br>
                <input
                    className="me-1 mb-1"
                    type="text"
                    value={searchAddress.city}
                    onChange={(event) => setSearchAddress({ ...searchAddress, city: event.target.value })}
                    placeholder="City"
                /><br></br>
                <input
                    className="me-3 mb-1 state"
                    type="text"
                    value={searchAddress.state}
                    onChange={(event) => setSearchAddress({ ...searchAddress, state: event.target.value })}
                    placeholder="State"
                />
                <button
                    className="ms-5 btn btn-secondary btn-sm"
                    onClick={handleSearch}>Search
                </button>
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
