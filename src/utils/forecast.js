const request = require('request')

const forecast = (latitude, longitude ,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a49c34545b1f08beff5192a27f78318a&query=' + latitude + ',' + longitude

    request(
        {
            url: url,
            json: true
        }, (error, {body}) => {
            if(error) {
                callback('Unable to connect to weather services!', undefined)
            }
            else if(body.error) {
                // callback('Unable to find location', undefined)
                console.log(body.error)
            }
            else {
                callback(undefined, 'The current temperature is: ' + body.current.temperature + '.' +
                'The chance of percipitation is: ' + body.current.precip + '% .' +
                'Today is: ' + body.current.weather_descriptions[0]  + '.' +
                'The localtime here right now is: ' + body.location.localtime)
                
            }
        })
}

module.exports = forecast

//const url = 'http://api.weatherstack.com/current?access_key=a49c34545b1f08beff5192a27f78318a&query=37.8267,-122.4233&units=f'