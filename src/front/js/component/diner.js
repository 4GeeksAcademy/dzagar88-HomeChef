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
        <div style={{
            backgroundImage: `url(${homechefBG})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "783px"
        }} className="d-flex">
            <div className="margin16"><br></br>
                <h1 className="d-flex justify-content-center me-2 title-font white-title opacity60">Diner</h1>
                <p className="d-flex justify-content-center me-2 lower-font white-title opacity60">Here you can search for a local "Chef"...</p>
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
                    className="btn white-title oy-button btn-sm mb-1 pb-1"
                    onClick={handleSearch}>Search
                </button>
            </div>
            {/* <div className="margin16r"> */}
            <GoogleMap zoom={10} center={center} mapContainerClassName="map-container margin16r mt-2">
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
        // </div>
    );
};
