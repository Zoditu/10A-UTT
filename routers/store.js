const express = require('express');
const storesValidation = require('../validation/stores.validation');
const router = express.Router();

const Tienda = require('../models/Tienda');

router.post('/new', async (req, res) => {
    const body = req.body;
    const validate = storesValidation.newStore(body);
    
    //Inversión: Si sabes cuándo o porqué falla, no verifiques nada
    //Simplemente, retorna o regresa el error
    if(validate.error) {
        return res.status(400).send(validate.error.details);
    }

    //Validar que no se dupliquen
    const duplicado = await Tienda.findOne({ $or: [
        {clave: body.clave},
        {rfc: body.rfc}
    ]});

    if(duplicado) {
        return res.status(409).send({
            message: "La clave ó RFC ya existen",
            info: body
        });
    }

    //Crear la nueva tienda
    const nuevaTienda = new Tienda(body);
    await nuevaTienda.save();
    res.send({
        created: true
    });
});

router.delete('/:clave_rfc', async (req, res) => {
    const clave_rfc = req.params.clave_rfc;
    const existe = await Tienda.findOne({ $or: [
        {clave: clave_rfc},
        {rfc: clave_rfc}
    ]});

    if(!existe) {
        return res.status(404).send({
            message: "La clave ó RFC no existen",
        });
    }

    await Tienda.deleteOne({ $or: [
        {clave: clave_rfc},
        {rfc: clave_rfc}
    ]});

    res.send({
        deleted: true
    });
})

router.get('/all', async (req, res) => {
    const tiendas = await Tienda.find({});
    res.send(tiendas);
});

module.exports = router;