import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext.js";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const [nameInput, setNameInput] = useState("");
    const [bioInput, setBioInput] = useState("");

    const saveProfile = () => {
        handleSubmit();
        setNameInput("");
        setBioInput("");
    }

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
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.error('Error:', error);
            });
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    id="name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)} />
            </div>
            <div>
                <textarea
                    id="bio"
                    placeholder="About You"
                    value={bioInput}
                    onChange={(e) => setBioInput(e.target.value)} />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};