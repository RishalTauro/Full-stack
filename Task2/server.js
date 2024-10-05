const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, password } = req.body;

    // Server-side validation
    if (!name || !email || !password) {
        return res.send('All fields are required!');
    }
    if (password.length < 6) {
        return res.send('Password must be at least 6 characters long!');
    }

    // Simulate saving to a database or performing some actions
    console.log(`Received submission: Name - ${name}, Email - ${email}, Password - ${password}`);

    // Send a response to the user
    res.send(`Thank you for submitting the form, ${name}!`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
