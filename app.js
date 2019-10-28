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

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(publicPath))
app.use('/admin', adminRoutes.router)
app.use(shopRoutes)

app.use((req, res) => {
  res.status(404).render('404', {title: 'Page Not Found', path: ''})
})

app.listen(3000)
