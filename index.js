const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
	res.send('Working')
})

app.listen(port, () => {
	console.log(`Server Started at https://127.0.0.1:${port} ... !`)
})
