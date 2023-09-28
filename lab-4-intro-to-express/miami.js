const express = require('express')

//add the view engine
const expressHandlebars = require('express-handlebars')

const res = require('express/lib/response')

const app = express()

//configure our express app to use handlebars
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')
//ends handlebar configuration

const port = process.env.port || 3000

//Routes go before 404 and 500
app.get('/', (req,res) => {
    res.render('home')
})
app.get('/about', (req,res) => {
    res.render(about)
})
// This generates an erro rbecause the parameters dont match
//response is supposed to be res
app.get('/nightlife', (req, res) => {
    res.type('test/plain')
    res.send('Miami at Night')
})



//Error handling app.use() basic express route
app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.render('404')
})

//Sever error 500
app.use((error, res, req, next) =>{
    console.log(error.message)
    res.type('text/plain')
    res.status(500)
    res.render('500')
})

//setup listener
app.listen(port, () => {
    console.log(`Server started http://localhost:${port}`)
    //console.log('Server started http://localhost:'+port)
    console.log('To close press Ctrl-C')
})