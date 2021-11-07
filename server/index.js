"use strict"

require('dotenv').config()

const http = require('http')
const { db } = require('../db/_index')
const app = require("./_globalRoutes")
const server = http.createServer(app)

const port = normalizePort(process.env.PORT)
const apiName = process.env.API_NAME

app.set('port', port)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
server.on('close', onClose)

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) { return val; }
    if (port >= 0) { return port; }
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') { throw error; }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }
}

function onListening() { db.sync({ alter: process.env.NODE_ENV === 'production' ? false : true }) }
function onClose() { db.close() }

console.log(`${apiName} start on port ${port}`);

module.exports = server
