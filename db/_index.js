"use strict"

const db = require("ciql-secry").db()
const { Courriel, Document, Etat, User, } = require('../schema')

exports.models = { 
        Courriel: db.define('Courriel', Courriel.attrs, Courriel.opts),  
        Document: db.define('Document', Document.attrs, Document.opts),  
        Etat: db.define('Etat', Etat.attrs, Etat.opts),  
        User: db.define('User', User.attrs, User.opts),  
}

exports.db = db

