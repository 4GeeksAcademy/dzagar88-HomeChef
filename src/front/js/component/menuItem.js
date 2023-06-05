import { CardActions, accordionActionsClasses } from "@mui/material";
import React, { useState } from "react";

export const MenuItem = () => {
    const [menuItems, setMenuItems] = useState([]);
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

    const [editMode, setEditMode] = useState(false);
    const [editItemId, setEditItemId] = useState(null);

    const addMenuItem = () => {
        const newMenuItem = {
            id: Date.now(),
            title: titleInput,
            image: imageInput,
            description: descriptionInput,
            ingredients: ingredientsInput,
            dietaryPreferences: dietaryPreferencesInput,
            allergen: allergenInput,
            estimateTime: estimatedTimeInput,
            quantityAvailable: quantityAvailableInput,
            street: streetInput,
            city: cityInput,
            state: stateInput,
        };
        setMenuItems(prevItems => [...prevItems, newMenuItem]);
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

    console.log("menuitem", menuItems)

    const removeMenuItem = id => {
        setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
        if (editItemId === id) {
            setEditMode(false);
            setEditItemId(null);
        }
    };

    const editMenuItem = id => {
        const menuItem = menuItems.find(item => item.id === id);
        if (menuItem) {
            setEditMode(true);
            setEditItemId(id);
            setTitleInput(menuItem.title);
            setImageInput(menuItem.image);
            setDescriptionInput(menuItem.description);
        }
    };

    const updateMenuItem = () => {
        const updatedMenuItem = {
            id: editItemId,
            title: titleInput,
            image: imageInput,
            description: descriptionInput,
        };
        setMenuItems(prevItems =>
            prevItems.map(item => (item.id === editItemId ? updatedMenuItem : item))
        );
        setTitleInput('');
        setImageInput('');
        setDescriptionInput('');
        setEditMode(false);
        setEditItemId(null);
    };

    const handleAddOrUpdate = () => {
        if (editMode) {
            updateMenuItem();
        } else {
            addMenuItem();
        }
    };

    const testFunction = (titleInput, imageInput, descriptionInput, ingredientsInput, dietaryPreferences, allergenInput, estimatedTimeInput, quantityAvailableInput, streetInput, cityInput, stateInput) => {
        fetch(process.env.BACKEND_URL + '/api/chef', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titleInput, imageInput, descriptionInput, ingredientsInput, dietaryPreferences, allergenInput, estimatedTimeInput, quantityAvailableInput, streetInput, cityInput, stateInput }),
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
            {/* <button onClick={handleAddOrUpdate}>
                {editMode ? 'Update Dish' : 'Add Dish'}
            </button> */}
            <button onClick={() => {
                testFunction(menuItems)
            }}></button>
            <div>
                {menuItems.map(item => (
                    <div key={item.id} className="card">
                        <h3>{item.title}</h3>
                        <img src={item.image} alt="Menu Item" />
                        <p>{item.description}</p>
                        <button onClick={() => editMenuItem(item.id)}>Edit</button>
                        <button onClick={() => removeMenuItem(item.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
