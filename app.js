const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./middleware/logger');


const app = express();
const PORT = process.env.PORT || 5000;

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) ); 



//init middleWare
app.use(logger);

app.use(cors());
app.use('/products',require('./routes/api/products'));
// app.use(cors());




app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));