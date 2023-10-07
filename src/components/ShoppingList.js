import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //making sure useEffect has [] depency
  useEffect(()=>{
    fetch('http://localhost:4000/items')
    .then(response => response.json())
    .then(data => {setItems(data); console.log(data)})
  },[])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleSetItems(item){
    setItems([...items, item]);
  }

  function handleAddToCart(item){
    const updatedList = items.map((el) => {
      if(el.id === item.id){
        return item;
      }
      return el;
    });
    setItems(updatedList);
  }

  function handleDeleteItem(item){
    setItems(items.filter((el) => el.id !== item.id));
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemChange={handleSetItems}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onAddCart={handleAddToCart} onDelete={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
