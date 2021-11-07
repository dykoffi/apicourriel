"use strict"

const db = require("ciql-secry").db()
const { Courriel, Document, Etat, User, } = require('../schema')

exports.models = { 
        Courriel: db.define('Courriel', Courriel.attributes, Courriel.options),  
        Document: db.define('Document', Document.attributes, Document.options),  
        Etat: db.define('Etat', Etat.attributes, Etat.options),  
        User: db.define('User', User.attributes, User.options),  
}

exports.db = db

