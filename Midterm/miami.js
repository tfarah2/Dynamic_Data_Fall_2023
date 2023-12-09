const express = require('express')

//add the view engine
const expressHandlebars = require('express-handlebars')

const app = express()

const res = require('express/lib/response')

//configure our express app to use handlebars
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')
//ends handlebar configuration

//Static files or folders are specified before any routes
app.use(express.static(__dirname + "/public"))

const port = process.env.port || 3000

//require gallery outside the view because we will use the same in all get requests
const gallery = require('./data/gallery.json')

//Routes go before 404 and 500
app.get('/', (req,res) => {
    var data = require('./data/home-data.json')
    res.render('page',{data, gallery})
})

app.get('/milan', (req,res) => {
    var data = require('./data/milan-data.json')
    res.render('page',{data, gallery})
})

app.get('/rome', (req,res) => {
    var data = require('./data/rome-data.json')
    res.render('page',{data, gallery})
})

app.get('/food', (req,res) => {
    var data = require('./data/food-data.json')
    res.render('page',{data, gallery})
})

app.get('/museums', (req,res) => {
    var data = require('./data/museums-data.json')
    res.render('page',{data, gallery})
})

// This generates an erro rbecause the parameters dont match
//response is supposed to be res
app.get('/nightlife', (req, res) => {
    res.render('nightlife')
})


//Error handling app.use() basic express route
app.use((req, res) => {
    res.status(404)
    res.render('404')
})

//Sever error 500
app.use((error, res, req, next) =>{
    console.log(error.message)
    res.status(500)
    res.render('500')
})

//setup listener
app.listen(port, () => {
    console.log(`Server started http://localhost:${port}`)
    //console.log('Server started http://localhost:'+port)
    console.log('To close press Ctrl-C')
})