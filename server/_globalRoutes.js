"use strict"

const app = require('./app')
const createError = require('http-errors');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/_index");


app.use('/Courriel', require('../api/Courriel/routes.js')); 
app.use('/Document', require('../api/Document/routes.js')); 
app.use('/Etat', require('../api/Etat/routes.js')); 
app.use('/User', require('../api/User/routes.js')); 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => { next(createError(404)) });
app.use((err, req, res, next) => {
    res.status(404).json({ error : err.name, message: err.message })
});

module.exports = app