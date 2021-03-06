const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 4000

//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup Handlebars and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directories
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App' ,
        name: 'Ani'
    })
})

app.get('/about',(req,res) => {
    res.render('about' ,{
        title: 'About me' ,
        name: 'Ani'
    })
})

app.get('/help',(req,res) => {
    res.render('help' ,{
        title: 'How Can I Help You?' ,
        name: 'Ani'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res) => { 
    if(!req.query.search) {
        return res.send({
            error: 'You must send a search request!'
        })
    }

    console.log(req.query.search)
    res.send(
        {
            products: []
        }
    )
})

app.get('/help/*',(req,res) => {
    res.render('404',
    {
        title: 'Error Page' ,
        name: 'Ani' ,
        errorMessage: 'Help article not found!'
    })
})

app.get('*',(req,res) => {
    res.render('404',
    {
        title: 'Error Page' ,
        name: 'Ani' ,
        errorMessage: 'Page Not Found!'
    })
})

app.listen(port, () => {
    console.log('The server is running on port 4000.')
})