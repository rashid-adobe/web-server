const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8418c6c481f9f178904df8bb002fd9dd&query=' + address

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.error) {
            console.log('Endpoint detail is not correct')
        } else {
            callback(undefined, {
                latitude: body.location.lon,
                longitude: body.location.lat,
                location: body.location.name,
                country: body.location.country
            })
        }
    })
}

module.exports = geocode