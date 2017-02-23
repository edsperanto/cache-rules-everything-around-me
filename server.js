const redis = require('redis');
const client = redis.createClient();
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const creamCache = require('./services/creamCache');

const { slow } = require('./routes');

const app = express();

app.engine('.hbs', handlebars({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.use(bodyParser.json());
app.use(creamCache.init()); /* student implements this */
app.use('/slow', slow);

app.get('/', (req, res) => {
  res.render('index');
});

module.exports = app;
