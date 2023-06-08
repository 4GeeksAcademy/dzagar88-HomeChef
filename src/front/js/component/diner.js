import React, { useState, useContext } from "react";
import { useLoadScript, GoogleMap, Marker, Circle } from "@react-google-maps/api";
import homechefBG from "../../img/homechefBG.jpg"
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

    const toggleButton = () => {
        if (alignment === 'home') {
            return <Home />;
        } else if (alignment === 'diner') {
            return <Diner />;
        } else {
            return <Chef />;
        }
    }
    return (
        <div style={{
            backgroundImage: `url(${homechefBG})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        }}><div>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    className="Toggle margin16"
                >
                    {/* <ToggleButton className="bg-light border" value="home" onClick={() => handleClick('home')}>Home</ToggleButton> */}
                    <ToggleButton className="bg-light border" value="diner" onClick={() => handleClick('diner')}>Diner</ToggleButton>
                    <ToggleButton className="bg-light border" value="chef" onClick={() => handleClick('chef')}>Chef</ToggleButton>
                </ToggleButtonGroup>
                <div className="container"><br></br>
                    <h1 style={{ width: "12%" }} className="d-flex justify-content-center me-2 title-font white-title opacity60">Diner</h1>
                    <p style={{ width: "37%", fontSize: "25px" }} className="d-flex justify-content-center me-2 lower-font white-title opacity60">Here you can search for a local "Chef"...</p>
                </div>
                <div className="container marginleft20px">
                    <input
                        className="me-1 mb-1"
                        type="text"
                        value={searchAddress.street}
                        onChange={(event) => setSearchAddress({ ...searchAddress, street: event.target.value })}
                        placeholder="Street"
                    />
                    <input
                        className="me-1 mb-1"
                        type="text"
                        value={searchAddress.city}
                        onChange={(event) => setSearchAddress({ ...searchAddress, city: event.target.value })}
                        placeholder="City"
                    />
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
                    {/* <div className="container d-flex justify-content-center"> */}
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
                    {/* </div> */}
                </div>

            </div>



        // </div>
    );
};
