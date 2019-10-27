const express = require('express')
const bodyParser = require('body-parser')
const { viewPath, publicPath } = require('./utils/path')

const app = express()
app.set('view engine', 'pug')

const adminRoutes = require('./routes/admin.routes')
const shopRoutes = require('./routes/shop.routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(publicPath))
app.use('/admin', adminRoutes.router)
app.use(shopRoutes)

app.use((req, res) => {
  res.status(404).sendFile(viewPath('404.html'))
})

app.listen(3000)
