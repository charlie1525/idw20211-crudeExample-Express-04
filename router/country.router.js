const router = require('express').Router();
const mongoose = require('mongoose');
var status = require('http-status');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/countries', {
    useNewUrlParser: true,
    useUnifiedTopology: true
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

                        }) // fin del json

                } // fin de la funcion de error
            );
    });

    router.get('/', (req, res) => {
        // Busqueda general
        Country.find({})
            .then(
                (countries) => {
                    res.json({
                        code: status.OK,
                        msj: 'Consulta correcta',
                        data: countries
                    }) //EL json de todos los paises
                }
            ) //Fin del then
            .catch(
                (err) => {
                    res.status(status.BAD_REQUEST)
                        .json({
                            code: status.BAD_REQUEST,
                            msg: 'Error en la petición',
                            err: err.name,
                            detail: err.message
                        })
                } // fin del error
            ) // fin del catch

    }); //fin del get 

    router.get('/:id', (req, res) => {
        // Busqueda especifica con el ID
        const id = req.params.id;

        Country.findOne({_id: id})
            .then(
                (country) => {
                    if (country)
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
                (err) => {
                    res.status(status.BAD_REQUEST)
                        .json({
                            code: status.BAD_REQUEST,
                            msg: 'Error en la petición',
                            err: err.name,
                            detail: err.message
                        })
                } // fin del error
            ) // fin del catch

    }); //fin del get 


    router.put('/:id', (req, res) => {
        const Id = req.params.id;
        let bodyUpdate = req.body

        Country.findByIdAndUpdate(Id,bodyUpdate,{new:true},(err,countryUpdate)=>{
            if(err){
                res.json({
                    code: status.NOT_MODIFIED,
                    msg: 'El país no se pudo actualizar',
                    err: err.name,
                    details: err.message
                })//Fin del json del error
            
            } // fin del if para el eror
            res.json({
                code: status.OK,
                msg: 'Actualización Exitosa'
            })// fin del Json para la actualizacion exitosa

        })// fin de buscarr y actualizar

    }); //fin del metodo para actualizar

    router.delete('/:id',(req,res)=>{
        const Id = req.params.id

        Country.findById(Id,(err,country)=>{
            if(err)
            res.json({
                code: status.NOT_FOUND,
                msg: 'Error al borrar el país',
                err:err.name,
                details: err.message
            }) //fin del error

            country.remove(err =>{
                if(err){
                    res.json({
                        code: status.INTERNAL_SERVER_ERROR,
                        msg: 'Error al borrar el país',
                        err:err.name,
                        details: err.message
                    }) // fin del error si no lo remueve
                }
                res.json({
                    code: status.OK,
                    msg: 'El país se borro corectamente'
                }) // fin si lo encuentra de forma satisfactoria

            }) //Fin del remove
        })//fin del find
    });// fin del delete

    return router;
};