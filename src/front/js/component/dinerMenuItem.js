import React from "react";

export const DinerMenuItem = ({ menuItem }) => {
    return (
        <div>
            <h3>{menuItem.title}</h3>
            <p><u>Description:</u> {menuItem.description}</p>
            <p><u>Ingredients:</u> {menuItem.ingredients}</p>
            <p><u>Dietary Preferences:</u> {menuItem.dietary_preferences}</p>
            <p><u>Allergen:</u> {menuItem.allergen}</p>
            <p><u>Estimated Time:</u> {menuItem.estimated_time}</p>
            <p><u>Quantity Available:</u> {menuItem.quantity_available}</p>
            <p><u>Street:</u> {menuItem.street}</p>
            <p><u>City:</u> {menuItem.city}</p>
            <p><u>State:</u> {menuItem.state}</p>
        </div>
    );
}
