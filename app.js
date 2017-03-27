const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const api = require('./utils/api')

var db
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get('/v1/representatives', (req, res) => {
  api.getRepresentatives((err, data) => {
    res.send({
      message: 'Welcome to the Commons API',
      data: data
    })
  })
})

app.get('*', (req, res) => {
  res.sendFile('./index.html', { root: __dirname });
})

MongoClient.connect('mongodb://localhost/commons', (err, database) => {
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})