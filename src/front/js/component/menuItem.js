import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";


export const MenuItem = () => {
    const [menuItems, setMenuItems] = useState([]);
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
    };

    const testFunction = () => {
        fetch(process.env.BACKEND_URL + '/api/chef', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${store.token}`
            },
            body: JSON.stringify({ title: titleInput, image: imageInput, description: descriptionInput, ingredients: ingredientsInput, dietary_preferences: dietaryPreferencesInput, allergen: allergenInput, estimated_time: estimatedTimeInput, quantity_available: quantityAvailableInput, street: streetInput, city: cityInput, state: stateInput }),
        })
            .then((response) => {
                if (response.ok) {
                    // The request was successful (status code 2xx)
                    return response.json();
                } else {
                    // The request failed (status code 4xx or 5xx)
                    throw new Error('Error: ' + response.status);
                }
            })
            .then((data) => {
                // Handle the response data (e.g., show success message, update UI)
                console.log('Menu item added successfully:', data);
            })
            .catch((error) => {
                // Handle any errors (e.g., display error message)
                console.error('Error:', error.message);
            });
    }

    return (
        <div className="menuItemForm">
            <input
                type="text"
                placeholder="Title*"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
            />
            <input
                type="text"
                placeholder="Image URL*"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
            />
            <textarea
                placeholder="Description*"
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
            />
            <textarea
                placeholder="Ingredients*"
                value={ingredientsInput}
                onChange={(e) => setIngredientsInput(e.target.value)}
            />
            <textarea
                placeholder="Dietary Preferences"
                value={dietaryPreferencesInput}
                onChange={(e) => setDietaryPreferencesInput(e.target.value)}
            />
            <textarea
                placeholder="Allergen"
                value={allergenInput}
                onChange={(e) => setAllergenInput(e.target.value)}
            />
            <input
                type="text"
                placeholder="Estimated Time to Cook*"
                value={estimatedTimeInput}
                onChange={(e) => setEstimatedTimeInput(e.target.value)}
            />
            <input
                type="text"
                placeholder="Quantity Available*"
                value={quantityAvailableInput}
                onChange={(e) => setQuantityAvailableInput(e.target.value)}
            />
            <input
                type="text"
                placeholder="Street*"
                value={streetInput}
                onChange={(e) => setStreetInput(e.target.value)}
            />
            <input
                type="text"
                placeholder="City*"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
            />
            <input
                type="text"
                placeholder="State*"
                value={stateInput}
                onChange={(e) => setStateInput(e.target.value)}
            />
            <button onClick={() => {
                addMenuItem()
            }}>Add Dish</button>
        </div>
    );
};
