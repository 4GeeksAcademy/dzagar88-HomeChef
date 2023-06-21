import React, { useState, useContext, useEffect } from 'react';
import homechefBG from "../../img/homechefBG.jpg";
import { Context } from "../store/appContext.js";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const [nameInput, setNameInput] = useState("");
    const [bioInput, setBioInput] = useState("");

    const saveProfile = () => {
        handleSubmit();
    }

    useEffect(() => {
        // Retrieve the last submitted information from localStorage
        const storedName = localStorage.getItem("name");
        const storedBio = localStorage.getItem("bio");
        setNameInput(storedName || "");
        setBioInput(storedBio || "");
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            name: nameInput,
            bio: bioInput,
        }
        fetch(process.env.BACKEND_URL + '/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${store.token}`
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // Handle the response from the backend
                console.log(data); // You can customize this based on your requirements

                setNameInput(data.name || "");
                setBioInput(data.bio || "");

                localStorage.setItem("name", data.name || "");
                localStorage.setItem("bio", data.bio || "");
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.error('Error:', error);
            });
    }

    return (
        <div className=''
            style={{
                backgroundImage: `url(${homechefBG})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                height: "630px"
            }}>
            <div className='d-flex justify-content-center mt-0 title-font'>
                <form onSubmit={handleSubmit}>
                    <div className="border border-dark shadow1 my-2 ">
                        <input
                            style={{ width: "20rem" }}
                            type="text"
                            placeholder="Name"
                            id="name"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)} />
                    </div>
                    <div className='mt-1 mb-2'>
                        <textarea
                            className='border border-dark shadow1'
                            style={{ width: "20rem", height: "500px" }}
                            id="bio"
                            placeholder="About You"
                            value={bioInput}
                            onChange={(e) => setBioInput(e.target.value)} />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button
                            className='btn white-title oy-button my-2 shadow1'
                            type="submit">Save</button>
                    </div>
                </form>
            </div>

        </div>
    );
};