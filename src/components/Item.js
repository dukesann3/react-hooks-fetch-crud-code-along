import React from "react";

function Item({ item, onAddCart, onDelete}) {

  function cartHandler(){
    return fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isInCart: !item.isInCart
      })
    })
      .then(response => response.json())
      .then((item) => {
        //adds new updated item into json server
        onAddCart(item);
      })
    }

    function deleteHandler(){
      return fetch(`http://localhost:4000/items/${item.id}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(() => onDelete(item));
    }


  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={() => cartHandler()}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={() => deleteHandler()}>Delete</button>
    </li>
  );
}

export default Item;
