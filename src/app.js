const express = require('express')
const app = express()
const bp = require('body-parser')

//conecta ao banco
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://vieiraigor87:obaoba@fullstack-ijwbj.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true} )

// carrega os models
const Product = require('./models/product')

const indexRoute = require('./routes')
const usersRoute = require('./routes/users')
//configurando bodyparser para que a requisição seja convertida em json na sua response 
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.use('/', indexRoute)
app.use('/users', usersRoute)

module.exports = app