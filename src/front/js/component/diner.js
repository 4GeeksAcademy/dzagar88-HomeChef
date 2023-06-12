import React, { useState, useContext } from "react";
import { useLoadScript, GoogleMap, Marker, Circle } from "@react-google-maps/api";
import homechefBG from "../../img/homechefBG.jpg";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

const libraries = ["places"];

export const Diner = () => {
    const [alignment, setAlignment] = React.useState('diner');
    const navigate = useNavigate();
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
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
    const { store, actions } = useContext(Context);
    const handleSearch = () => {
        const address = `${searchAddress.street}, ${searchAddress.city}, ${searchAddress.state}`;
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK" && results.length > 0) {
                const location = results[0].geometry.location;
                setCenter({ lat: location.lat(), lng: location.lng() });
                actions.getMenuItems()
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    const handleClick = (value) => {
        console.log(`Button ${value} clicked!`);
        if (value === "home") {
            navigate("/");
        } else if (value === "diner") {
            navigate("/diner");
        } else {
            navigate("/chef");
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${homechefBG})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >
            <div>
                <br />
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    className="Toggle d-flex justify-content-center"
                >
                    <ToggleButton
                        className="bg-light border"
                        value="diner"
                        onClick={() => handleClick('diner')}
                    >
                        Diner
                    </ToggleButton>
                    <ToggleButton
                        className="bg-light border"
                        value="chef"
                        onClick={() => handleClick('chef')}
                    >
                        Chef
                    </ToggleButton>
                </ToggleButtonGroup>
                <div className="container">
                    <br />
                    <h1
                        style={{ width: "85%" }}
                        className="white-title title-font opacity60 d-flex justify-content-center m-auto"
                    >
                        Diner
                    </h1>
                    <br />
                    <p
                        style={{ fontSize: "20px", width: "85%" }}
                        className="white-title lower-font opacity60 m-auto p-1 d-flex justify-content-center"
                    >
                        Here you can search for a local "Chef"...
                    </p>
                </div>
                <div className="container d-flex justify-content-center flex-wrap">
                    <div className="input-container">
                        <input
                            className="my-2 me-1"
                            type="text"
                            value={searchAddress.street}
                            onChange={(event) =>
                                setSearchAddress({ ...searchAddress, street: event.target.value })
                            }
                            placeholder="Street"
                        />
                    </div>
                    <div className="input-container">
                        <input
                            className="my-2 me-1"
                            type="text"
                            value={searchAddress.city}
                            onChange={(event) =>
                                setSearchAddress({ ...searchAddress, city: event.target.value })
                            }
                            placeholder="City"
                        />
                    </div>
                    <div className="input-container">
                        <input
                            className="my-2"
                            type="text"
                            value={searchAddress.state}
                            onChange={(event) =>
                                setSearchAddress({ ...searchAddress, state: event.target.value })
                            }
                            placeholder="State"
                        />
                    </div>
                    <div className="container d-flex justify-content-center">
                        <button
                            className="btn white-title oy-button btn m-3"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="container d-flex justify-content-center">
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
            </div>
        </div>
    );
};
