import React, { useEffect, useState } from 'react';
import api from "../api.js";
import AddItemsForm from './AddItemsForm.jsx';

// Small form component for adding an item
const AddItemForm = ({ addItem }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name) {
      addItem({ name, description });
      setName('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter item name"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description (optional)"
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

const ItemList = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await api.get('/items');
      // server returns { items: [...] }
      setItems(response.data.items || []);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  const addItem = async ({ name, description }) => {
    try {
      // generate a numeric id client-side to satisfy the server's Item model (id: int)
      const id = Date.now();
      await api.post('/items', { id, name, description });
      fetchItems();
    } catch (error) {
      console.error("Error adding item", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Items List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name} {item.description ? `- ${item.description}` : ''}</li>
        ))}
      </ul>
      <AddItemForm addItem={addItem} />
    </div>
  );
};

export default ItemList;
