const express = require('express')

//add the view engine
const expressHandlebars = require('express-handlebars')

const app = express()

const handler = require('./lib/handler')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

//configure our express app to use handlebars
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')
//ends handlebars configuration

const port = process.env.port || 3000

app.get('/',(req,res)=>{
    res.render('page', {req})
})

app.get('/mad',(req,res)=>{
    const data = require('./data/mad.data.json')
    res.render('madform', {data})
})

app.get('/madprocess', (req,res) =>{
    res.render('madprocess', {req})
})

app.get('/newsletter-signup',handler.newsletterSignup)

app.post('/newsletter-signup/process', handler.newsletterSignupProcess)


//this needs to be the very last thing we have in the file
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
app.listen(port,()=>{
    console.log(`Server started http://localhost:${port}`)
    console.log('To close press Ctrl C')
})