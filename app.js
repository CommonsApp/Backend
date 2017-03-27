const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs')

const api = require('./utils/api')

const app = express()
mongoose.connect('mongodb://localhost/commons');

app.use(bodyParser.urlencoded({extended: true}))

// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});

app.listen(3000, () => {
  console.log('listening on 3000')
})
