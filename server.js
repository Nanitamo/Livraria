if(process.env.NODE_ENV !== 'production'){
  require('dotenv')
}

const expressLayouts = require('express-ejs-layouts')
const express = require('express')
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')


const app = express();

// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true
// })
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', open =>console.log('Connectado ao MongoDB'))


const uri = "mongodb+srv://nanitamo:nanitamo@cluster0-rmanb.mongodb.net/livraria?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
client.connect(err => {
  const collection = client.db("livraria").collection("livros")
  collection.insertOne({
    name: "Nanitamo",
    age: "28",
    deggre: "licenciatura"
  })
  client.close()
})

const indexRouter = require('./routes/index')
const authorsRouter = require('./routes/authors')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended:false}))

app.use('/',indexRouter)
app.use('/authors', authorsRouter)
app.use('authors/new', authorsRouter)

app.listen(process.env.PORT || 3000)



