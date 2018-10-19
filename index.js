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
	res.redirect('https://github.com/login/oauth/authorize')
	console.log('Redirected')
})
// 2. Users are redirected back from GitHub with a code
app.get('/authenticated:code', (req, res) => {
	console.log(`Code: ${code}`)
})

app.listen(port, () => {
	console.log(`Server Started at https://127.0.0.1:${port} ... !`)
})
