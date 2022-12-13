const express = require('express')
const morgan = require('morgan')
const fs = require('fs-extra')
const cors = require('cors')

const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(morgan('combined'))

fs.readdirSync('./routers').map((r)=>{
  app.use('/api', require(`./routers/${r}`))
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})