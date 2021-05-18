const bodyParser = require('body-parser');
const Express = require('express');


const countryRoute = require('./router/country.router')();

let app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/v1/country',countryRoute);

module.exports = app;