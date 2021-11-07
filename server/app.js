"use strict"

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const cookieparser = require('cookie-parser');
const { saveLog } = require('ciql-secry');
const { cwd } = require('process');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(cwd(), 'public')));
app.use(cookieparser());
app.use(saveLog())

app.use(morgan('dev'))

module.exports = app;
