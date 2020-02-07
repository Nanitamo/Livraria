const express = require('express')
const route = express.Router()
const Author = require('../models/author')

//Todos autores
route.get('/', (req, res)=>{
  res.render('authors/index')
})

//Novo Autor
route.get('/new', (req, res)=>{
  res.render('authors/new', { author: new Author()})
})

//criar novo author

route.post('/',(req, res)=>{

  const author = new Author({
    name: req.body.name
  })
  author.save((err, newAuthor)=>{
    if(err){
      res.render('authors/new', {
        author: author,
        errorMessage: 'Erro ao criar um novo Autor'
      })
    }else{
      res.redirect(`authors`)
    }
  })
  res.send(req.body.name)

})

module.exports = route