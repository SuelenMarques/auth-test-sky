const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const uri = 'mongodb://localhost:27017/noderest';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

require('./src/models/User');

app.use('/', require('./src/routes'));

app.listen(3001);