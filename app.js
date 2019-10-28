const express = require('express')
const bodyParser = require('body-parser')
const { publicPath } = require('./utils/path')

const app = express()
//What template engine we will use.
app.set('view engine', 'pug')
//Where to find these templates. (Root folder/views is the default route.)
//app.set('views', 'views')

const adminRoutes = require('./routes/admin.routes')
const shopRoutes = require('./routes/shop.routes')
const errorController = require('./controllers/error.controller')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(publicPath))
app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

app.listen(3000)
