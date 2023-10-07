import React, { useState } from "react";

function ItemForm({ onItemChange }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function submitHandler(e) {
    e.preventDefault();
    const itemData = {
      name: name,
      category: category,
      isInCart: false,
    }

    if (!name && !category) {
      throw new Error('Need valid name and category to successfully submit data');
    }

    return fetch('http://localhost:4000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData)
    })
      .then(response => response.json())
      .then(items => {console.log(items); onItemChange(items)});

  }

  return (
    <form className="NewItem" onSubmit={(e) => submitHandler(e)}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
