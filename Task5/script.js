const apiUrl = 'http://localhost:3000/api/items';

document.getElementById('createItemBtn').addEventListener('click', () => {
    const itemName = document.getElementById('itemName').value;
    if (itemName) {
        createItem(itemName);
    }
});

function createItem(name) {
    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Item created:', data);
        fetchItems(); // Refresh the items list
    })
    .catch(error => console.error('Error creating item:', error));
}

function fetchItems() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const itemsList = document.getElementById('itemsList');
            itemsList.innerHTML = '';
            data.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `${item.name} 
                    <button class="updateBtn" onclick="updateItem('${item._id}')">Update</button>
                    <button class="deleteBtn" onclick="deleteItem('${item._id}')">Delete</button>`;
                itemsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching items:', error));
}

function deleteItem(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Item deleted:', data);
        fetchItems();
    })
    .catch(error => console.error('Error deleting item:', error));
}

function updateItem(id) {
    const newName = prompt('Enter new item name:');
    if (newName) {
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Item updated:', data);
            fetchItems();
        })
        .catch(error => console.error('Error updating item:', error));
    }
}

// Fetch and display the items on page load
fetchItems();
