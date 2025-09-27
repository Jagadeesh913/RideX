const express = require('express');

const app = express();

const connectDB = require("./DB/db");

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, async() => {
    try {
        await connectDB();
         console.log(`Server is running on port ${PORT}`);
    } catch (error) {
         console.error('Error starting server:', error);    
    }
});

