const express = require('express')
const path = require('path')
const hbss = require('hbs')
const fetch = require('node-fetch')
const geocode = require('../utils/geocode.js')
const forcast = require('../utils/forecast.js')
const forecast = require('../utils/forecast.js')


const app = express()
const publicPageDire = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('views', viewsPath)
hbss.registerPartials(partialsPath)

app.use(express.static(viewsPath))
app.set('view engine','hbs')
/*  if we are storing the views in a folder other than views
    then we need to set views in the node engine 
    https://expressjs.com/en/api.html#app.set

    app.set('views', path)
*/
app.use(express.static(publicPageDire))
app.get('', (req, res) => {
    res.render('index', {
    title: 'Express Welcome',
    name: 'Rashid'}
    )
    //res.send('Hello Express!')
})
app.get('/home', (req, res) => {
    res.sendFile(viewsPath+'/index.html')
})
app.get('/help', (req, res) => {
    res.send('How Express Help You Today!')
})
app.get('/about', (req, res) => {
    res.send('<h2>This is an express server!</h2>')
})
app.get('/product', (req, res) => {
    res.send({product:[]})
})
app.get('/location', (req, res) => {
    res.send({
        country:'United States of America',
        lat:'40.714',
        localtime:'2023-05-20 11:29'
    })
})
//app.com
//app.com/help
//app.com/about
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }

    geocode(req.query.search, (error, data) => {
        if(error != 'undefined') {
            console.log('Data '+JSON.stringify(data))
            res.send({
                data
            })
        } else {
            console.log('Error '+error)
            return res.send({error})
        }
    })

    
})
// app.get('*', (req, res) => {
//     res.send('Sorry, page doesnot exist')
// })


app.listen(3000, () => {
    console.log('server started on port 3000')
})
