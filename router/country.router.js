const router = require('express').Router();
const mongoose = require('mongoose');
var status = require('http-status');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/countries', {
    useNewUrlParser: true,
    useUnifiedTopology : true
});

const Country = require('../models/country.model');

module.exports = () => {
    router.post('/', (req, res) => {
        country = req.body;
        Country.create(country)
            .then(
                (data) => {
                    res.json({
                        code: status.OK,
                        msg: 'Se incertó correctamente',
                        data: data
                    }); // lo que retorna cuando no hay problemas
                }
            )
            .catch(
                (err) => {
                    res.status(status.BAD_REQUEST)
                        .json({
                            code: status.BAD_REQUEST,
                            msg: 'Ocurrió un error',
                            err: err.name,
                            detail: err.message

                        }
                    )// fin del json

                }// fin de la funcion de error
            );
    });

    return router;
};