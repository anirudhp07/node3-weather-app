const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5pcnVkaHAiLCJhIjoiY2tjaHB6cWdpMTF3bzM1cGYwZ2R0eWUzayJ9.FBv7Dn-cizVEDpZnevuDhw'

    request({
        url: url ,
        json: true
    }, (error, {body}) => {
            if(error) {
                callback('Unable to connect to the location', undefined)
            }
            else if(body.features.length === 0) {
                callback('Unable to find location. Try another search!', undefined)
            }
            else {
                    callback(undefined, {
                        latitude: body.features[0].center[1] ,
                        longitude: body.features[0].center[0] ,
                        location: body.features[0].place_name
                    })
            }
    })
}

module.exports = geocode

// const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYW5pcnVkaHAiLCJhIjoiY2tjaHB6cWdpMTF3bzM1cGYwZ2R0eWUzayJ9.FBv7Dn-cizVEDpZnevuDhw'