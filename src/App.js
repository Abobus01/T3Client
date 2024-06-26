import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
const [items, setItems] = useState([]);
const [newItem, setNewItem] = useState('');

useEffect(() => {
fetchItems();
}, []);

const fetchItems = async () => {
try {
const response = await axios.get('http://127.0.0.1:5000/items');
setItems(response.data);
} catch (error) {
console.error('Error fetching items:', error);
}
};

const addItem = async () => {
try {
await axios.post('http://127.0.0.1:5000/items', { name: newItem });
fetchItems();
setNewItem('');
} catch (error) {
console.error('Error adding item:', error);
}
};

const updateItem = async (id) => {
const updatedName = prompt('Enter new name');
if (updatedName) {
try {
await axios.put(`http://127.0.0.1:5000/items/${id}`, { name: updatedName });
fetchItems();
} catch (error) {
console.error('Error updating item:', error);
}
}
};

const deleteItem = async (id) => {
try {
await axios.delete(`http://127.0.0.1:5000/items/${id}`);
fetchItems();
} catch (error) {
console.error('Error deleting item:', error);
}
};

return (
<div>
<h1>Items</h1>
<ul>
{items.map(item => (
<li key={item.id}>
{item.name}
<button onClick={() => updateItem(item.id)}>Update</button>
<button onClick={() => deleteItem(item.id)}>Delete</button>
</li>
))}
</ul>
<input
type="text"
value={newItem}
onChange={(e) => setNewItem(e.target.value)}
/>
<button onClick={addItem}>Add Item</button>
</div>
);
};

export default App;