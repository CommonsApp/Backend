const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Welcome to the Commons API')
})

MongoClient.connect('mongodb://localhost/commons', (err, database) => {
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})