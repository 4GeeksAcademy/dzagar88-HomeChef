import React from "react";

export const DinerMenuItem = ({ MenuItem }) => {
    return (
        <div>
            <h3>{MenuItem.title}</h3>
            <p><u>Description:</u> {MenuItem.description}</p>
            <p><u>Ingredients:</u> {MenuItem.ingredients}</p>
            <p><u>Dietary Preferences:</u> {MenuItem.dietary_preferences}</p>
            <p><u>Allergen:</u> {MenuItem.allergen}</p>
            <p><u>Estimated Time:</u> {MenuItem.estimated_time}</p>
            <p><u>Quantity Available:</u> {MenuItem.quantity_available}</p>
            <p><u>Street:</u> {MenuItem.street}</p>
            <p><u>City:</u> {MenuItem.city}</p>
            <p><u>State:</u> {MenuItem.state}</p>
        </div>
    );
}
