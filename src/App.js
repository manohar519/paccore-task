import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"
const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    //fetching data from an API
    axios.get('https://dummyjson.com/todos')
      .then(response => {
        console.log(response)
        //set api response data to useState setItems
        setItems(response.data.todos);
      })
      .catch(error => {
        //handling the error
        console.log('Error fetching data:', error);
      });
  }, []);

  const handleAddItem = () => {
    if (newItem.trim()) {
      const newItemObject = {
        userId: 1,
        id: items.length + 1,
        todo: newItem,
        completed: false
      };
//in above we are using the data from API and also added new items to list 
      setItems([newItemObject,...items]);
      //after adding new items we are setting api data and added list item to setItems
      setNewItem('');
    }
    else{
      alert("Please Enter you List Item")
    }
  };

  return (
    <div className="container">
<h1> Paccore Task</h1>
      <div className="input-container">
        <div>
        <input
          type="text"
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          placeholder="Add a new item to List"
          className="input-field"
        />
        <button onClick={handleAddItem} className="add-button">Add To List</button>
        </div>
        
      <h2> List Items</h2>
      <ul className="todo-list">
        {items.map(item => (
          <li key={item.id} className="todo-item">{item.todo}</li>
        ))}
      </ul>
      
      </div>
    </div>
  );
};

export default App;
