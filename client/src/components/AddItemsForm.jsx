//Cambiar a lo que se necesite para enviar datos utilizando un formulario

import React, { useState } from 'react';

const AddItemsForm = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name: itemName,
      description: `Description for ${itemName}`,
      quantity,
    };
    onAddItem(newItem);
    setItemName('');
    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Item Name"
        required
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemsForm;