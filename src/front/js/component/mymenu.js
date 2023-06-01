import React, { Component } from "react";
import React, { useState } from "react";

function MyMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [titleInput, setTitleInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const addMenuItem = () => {
    const newMenuItem = {
      id: Date.now(),
      title: titleInput,
      image: imageInput,
      description: descriptionInput,
    };
    setMenuItems(prevItems => [...prevItems, newMenuItem]);
    setTitleInput('');
    setImageInput('');
    setDescriptionInput('');
  };

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

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={titleInput}
          onChange={e => setTitleInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageInput}
          onChange={e => setImageInput(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={descriptionInput}
          onChange={e => setDescriptionInput(e.target.value)}
        />
        <button onClick={handleAddOrUpdate}>
          {editMode ? 'Update Dish' : 'Add Dish'}
        </button>
      </div>
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
}


