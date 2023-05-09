const express = require('express');
const cors = require('cors')

const app = express();


require('./database');

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/index'))

app.listen(3001)
console.log('puerto 3001')