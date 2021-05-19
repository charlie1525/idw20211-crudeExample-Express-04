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
    //Incersión de paises
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

    router.get('/',(req,res)=>{
        // Busqueda general
        Country.find({})
        .then(
            (countries) =>{
                res.json({
                    code: status.OK,
                    msj: 'Consulta correcta',
                    data: countries
                }) //EL json de todos los paises
            }
        ) //Fin del then
        .catch(
            (err)=>{
                res.status(status.BAD_REQUEST)
                .json({
                    code: status.BAD_REQUEST,
                    msg: 'Error en la petición',
                    err: err.name,
                    detail: err.message
                })
            } // fin del error
        )// fin del catch

    }); //fin del get 


    router.get('/:id',(req,res)=>{
        // Busqueda especifica con el ID
        const id = req.params.id;

        Country.findOne({_id : id})
        .then(
            (country) =>{
                if(country)
                res.json({
                    code: status.OK,
                    msj: 'Consulta correcta',
                    data: country
                }) //EL json de todos los paises
                else 
                res.json({
                    code: status.NOT_FOUND,
                    msj: 'No se encontro el elemento'
                })
            }
        ) //Fin del then
        .catch(
            (err)=>{
                res.status(status.BAD_REQUEST)
                .json({
                    code: status.BAD_REQUEST,
                    msg: 'Error en la petición',
                    err: err.name,
                    detail: err.message
                })
            } // fin del error
        )// fin del catch

    }); //fin del get 

    return router;
};