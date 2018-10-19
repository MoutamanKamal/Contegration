const express = require('express')
const app = express()
const fs = require('fs')
const port = 3000
const config = JSON.parse(fs.readFileSync('config.json'))

app.get('/', (req, res) => {
	res.send('Working')
})

app.get('/login/github', (req, res) => {
	console.log('Redirectig')
	// 1. Users are redirected to request their GitHub identity
	res.redirect(
		`https://github.com/login/oauth/authorize?
		client_id=${config.client_id}
		&scope=${config.scope}`
	)
	console.log('Redirected')
})
// 2. Users are redirected back from GitHub with a code used to get an access token
app.get('/authenticated', (req, res) => {
	code = req.query.code
	res.send(`Code: ${code}`)
})

app.listen(port, () => {
	console.log(`Server Started at https://127.0.0.1:${port} ... !`)
})
