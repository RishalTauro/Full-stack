const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/task5')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));


// Define Item schema
const itemSchema = new mongoose.Schema({
    name: String
});

// Define Item model
const Item = mongoose.model('Item', itemSchema);

// API Endpoints
// Create Item
app.post('/api/items', async (req, res) => {
    const item = new Item({ name: req.body.name });
    await item.save();
    res.send(item);
});

// Read all Items
app.get('/api/items', async (req, res) => {
    const items = await Item.find();
    res.send(items);
});

// Update Item
app.put('/api/items/:id', async (req, res) => {
    const item = await Item.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    res.send(item);
});

// Delete Item
app.delete('/api/items/:id', async (req, res) => {
    const item = await Item.findByIdAndRemove(req.params.id);
    res.send(item);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
