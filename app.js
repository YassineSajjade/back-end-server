const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');


const app = express();
const PORT = process.env.PORT || 5000;

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) ); 

//middleWare method
const logger = (req,res,next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} at ${moment().format()}`);
    next();
}

//init middleWare
app.use(logger);

app.use('/products',require('./routes/api/products'));
// app.use(cors());




app.listen(PORT, () => console.log("Server running on Port 5000"));