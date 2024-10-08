const constants = require('./utils/constants');
const helpers = require('./utils/helpers');
let entorno = helpers.processArguments();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));

const config = require('./config.json');

const storesRouter = require('./routers/store');

//http:localhost:2024/stores/new
app.use('/stores', storesRouter);

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