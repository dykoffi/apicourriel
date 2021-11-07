"use strict"

const generalDocs = require("./info.json")

const CourrielDocs = require('../api/Courriel/docs.json') 
const DocumentDocs = require('../api/Document/docs.json') 
const EtatDocs = require('../api/Etat/docs.json') 
const UserDocs = require('../api/User/docs.json') 

module.exports = {
    ...generalDocs,
    paths: { 
        ...CourrielDocs, 
        ...DocumentDocs, 
        ...EtatDocs, 
        ...UserDocs,
    }
}