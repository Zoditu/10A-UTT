const constants = require('./utils/constants');
const arguments = process.argv;
let entorno = constants.ENVIRONMENTS.production;
arguments.forEach(arg => {
    let argumento = arg.toLowerCase();
    if(argumento.startsWith("--entorno=")) {
        let valor = argumento.replace("--entorno=", '');
        entorno = constants.ENVIRONMENTS[valor] || 
                  constants.ENVIRONMENTS.production;
    }
});

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('./config.json');

app.post('/stores', async (req, res) => {
    const body = req.body;
    
});

const PORT = config.mongo[entorno].port;
app.listen(PORT, function(error) {
    
    if(error) {
        console.error(error);
        process.exit(0);
    }
    
    console.log(`Conectado al puerto: ${PORT}`);
    const mongoURI = `${config.mongo[entorno].host}/${config.mongo[entorno].defaultDB}`;
    mongoose.connect(mongoURI).then(() => {
        console.log(`Conectado al mongo: ${mongoURI}`);
    }).catch((error) => {
        console.error(error);
    });
});