const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const users = require('./app/users');
const cocktails = require('./app/cocktails');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
  await mongoose.connect('mongodb://localhost/cocktail',
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

  app.use('/users', users);
  app.use('/cocktails', cocktails);

  console.log('Connected to MongoDB');
  app.listen(8000, () => console.log('Server started'));
};

run().catch(console.error);