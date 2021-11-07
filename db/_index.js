"use strict"

const db = require("ciql-secry").db()
const { Courriel, Document, Etat, User, } = require('../schema')

exports.models = { 
        Courriel: db.define('Courriel', Courriel.attrs ), 
        Document: db.define('Document', Document.attrs ), 
        Etat: db.define('Etat', Etat.attrs ), 
        User: db.define('User', User.attrs ), 
}

exports.db = db

