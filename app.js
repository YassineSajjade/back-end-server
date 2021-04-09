const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) ); 

app.use('/products',require('./routes/api/products'));








app.listen(PORT, () => console.log("Server running on Port 5000"));