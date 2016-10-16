const googleImages = require('./util/googleImageClient')
const express = require('express')
const config = require('config')
const path = require('path')
const app = express()

const _cseId = (process.env.CSE_ID || config.app.cseId)
const _apiKey = (process.env.API_KEY || config.app.apiKey)
const client = new googleImages(_cseId, _apiKey)

const _apiSecret = (process.env.API_SECRET || config.app.apiSecret)

app.get('/:apiKey/:searchTerm', (request, response) => {
  if (request.params.apiKey !== _apiSecret) return response.status(401).send('401 Unauthorized')

  client.search(`"${request.params.searchTerm}" logo`, { size: 'medium', lang: 'nl' })
    .then(images => {
      response.json(images.length > 1 ? images[0] : images)
    })
    .catch(error => {
      response.status(error.statusCode).send(error.statusMessage)
    })
})

app.get('/status', (request, response) => {
  let hostname = require('os').hostname();
  let dirname = process.cwd().split(path.sep).pop();
  response.type('text').send(`STATUS [${hostname}][${dirname}]: OK.`);
})

app.set('port', (process.env.PORT || config.server.port))

app.listen(app.get('port'), (err) => {
  if (err) return console.log(err)

  console.log(`Server is listening on port: ${app.get('port')}`)
})
