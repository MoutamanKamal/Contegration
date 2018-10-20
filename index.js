const express = require('express')
const app = express()
const request = require('request-promise-native')
const fs = require('fs')
const port = 3000
const config = JSON.parse(fs.readFileSync('config.json'))
let access_token

app.get('/', (req, res) => {
	res.send('Working')
})

app.get('/login/github', (req, res) => {
	console.log('Redirectig')
	// 1. Users are redirected to request their GitHub identity
	res.redirect(
		`https://github.com/login/oauth/authorize?client_id=${
			config.client_id
		}&scope=${config.scope}`
	)
	console.log('Redirected')
})

// 2. Users are redirected back from GitHub with a code used to get an access token
app.get('/authenticated', (req, res) => {
	code = req.query.code
	options = {
		headers: { Accept: 'application/json' },
		url: 'https://github.com/login/oauth/access_token',
		body: `client_id=${config.client_id}&client_secret=${
			config.client_secret
		}&code=${code}`
	}
	request
		.post(options)
		.then((body, response, error) => {
			access_token = JSON.parse(body).access_token
			// console.log(access_token)
		})
		.then(() => {
			res.send('<h1>Access Token : ' + access_token + '</h1>')
		})
})

app.listen(port, () => {
	console.log(`Server Started at https://127.0.0.1:${port} ... !`)
})
