const express = require('express');
const hbs = require('hbs')
const fs = require('fs')
const port = process.env.PORT || 3000

var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  var now = new Date().toString()
  log = `${now}: ${req.method} ${req.path}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err)
      console.log(`unable to append to server.log ${err}`)
  })
  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {})
// })

app.use(express.static(__dirname + '/public'))


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', function (req, res) {
  res.render('page.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: "Welcome home!"
  })
})

app.get('/projects', function (req, res) {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  })
})


app.get('/bad', (req, res) => {
  res.send({errorMessage: 'an error has occurred'})
})


app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})