const express = require('express');
const dbase = require('./dbapi/dbapi');

const app = express();

app.use('/api', dbase);

app.listen(81);