import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";

export const MenuItem = () => {
    const { store, actions } = useContext(Context);

    const [titleInput, setTitleInput] = useState("");
    const [imageInput, setImageInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [ingredientsInput, setIngredientsInput] = useState("");
    const [dietaryPreferencesInput, setDietaryPreferencesInput] = useState("");
    const [allergenInput, setAllergenInput] = useState("");
    const [estimatedTimeInput, setEstimatedTimeInput] = useState("");
    const [quantityAvailableInput, setQuantityAvailableInput] = useState("");
    const [streetInput, setStreetInput] = useState("");
    const [cityInput, setCityInput] = useState("");
    const [stateInput, setStateInput] = useState("");
    const [priceInput, setPriceInput] = useState("");

    const addMenuItem = () => {
        testFunction();
        setTitleInput("");
        setImageInput("");
        setDescriptionInput("");
        setIngredientsInput("");
        setDietaryPreferencesInput("");
        setAllergenInput("");
        setEstimatedTimeInput("");
        setQuantityAvailableInput("");
        setStreetInput("");
        setCityInput("");
        setStateInput("");
        setPriceInput("");
    };

    const testFunction = () => {
        fetch(process.env.BACKEND_URL + "/api/chef", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.token}`,
            },
            body: JSON.stringify({
                title: titleInput,
                image: imageInput,
                description: descriptionInput,
                ingredients: ingredientsInput,
                dietary_preferences: dietaryPreferencesInput,
                allergen: allergenInput,
                estimated_time: estimatedTimeInput,
                quantity_available: quantityAvailableInput,
                street: streetInput,
                city: cityInput,
                state: stateInput,
                price: priceInput,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    // The request was successful (status code 2xx)
                    return response.json();
                } else {
                    // The request failed (status code 4xx or 5xx)
                    throw new Error("Error: " + response.status);
                }
            })
            .then((data) => {
                // Handle the response data (e.g., show success message, update UI)
                actions.getMenuItems();
                console.log("Menu item added successfully:", data);
            })
            .catch((error) => {
                // Handle any errors (e.g., display error message)
                console.error("Error:", error.message);
            });
    };

    return (
        <div className="title-font text-center">
            <input
                type="text"
                placeholder="Title*"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                style={{ width: "85%" }}
            />
            <br />
            <input
                type="text"
                className="my-1"
                placeholder="Image URL*"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                style={{ width: "85%" }}
            />
            <br />
            <textarea
                className="my-1"
                placeholder="Description*"
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
                style={{ width: "85%" }}
            />
            <br />
            <textarea
                placeholder="Ingredients*"
                value={ingredientsInput}
                onChange={(e) => setIngredientsInput(e.target.value)}
                style={{ width: "85%" }}
            />
            <br />
            <textarea
                placeholder="Dietary Preferences"
                value={dietaryPreferencesInput}
                onChange={(e) => setDietaryPreferencesInput(e.target.value)}
                style={{ width: "85%" }}
            />
            <textarea
                placeholder="Allergen"
                value={allergenInput}
                onChange={(e) => setAllergenInput(e.target.value)}
                style={{ width: "85%" }}
            />
            <br />
            <input
                type="text"
                placeholder="Estimated Time to Cook*"
                value={estimatedTimeInput}
                onChange={(e) => setEstimatedTimeInput(e.target.value)}
                style={{ width: "85%" }}
            />
            <input
                type="text"
                className="my-1"
                placeholder="Quantity Available*"
                value={quantityAvailableInput}
                onChange={(e) => setQuantityAvailableInput(e.target.value)}
                style={{ width: "85%" }}
            />
            <br />
            <br />
            <div
                style={{ fontSize: "35px", width: "85%" }}
                className="title-font white-title opacity60 m-auto shadow1">Address Information:</div>
            <br />
            <input
                type="text"
                placeholder="Street*"
                value={streetInput}
                onChange={(e) => setStreetInput(e.target.value)}
                style={{ width: "84%" }}
            />
            <br />
            <input
                type="text"
                className="me-1"
                placeholder="City*"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                style={{ width: "60%" }}
            />
            <input
                type="text"
                className="my-1"
                placeholder="State*"
                value={stateInput}
                onChange={(e) => setStateInput(e.target.value)}
                style={{ width: "23%" }}
            />
            <input
                type="text"
                className="my-1"
                placeholder="Price*"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                style={{width: "85%" }}
            />
            <br />
            <button
                style={{ width: "25%" }}
                className="btn white-title oy-button my-2 shadow1"
                onClick={addMenuItem}>Add Dish</button>
        </div >
    );
};
