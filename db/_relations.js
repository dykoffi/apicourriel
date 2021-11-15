"use strict"

const { models : { Courriel, Document, Etat, User} } = require('./_index')

//Define Relationship between models


Courriel.belongsToMany(Etat, {"through":"Etat_Courriel","onDelete":"CASCADE","onUpdate":"CASCADE"})
Courriel.hasMany(Document, {"onDelete":"CASCADE","onUpdate":"CASCADE"})

Document.belongsTo(Courriel, {"onDelete":"CASCADE","onUpdate":"CASCADE"})

Etat.belongsToMany(Courriel, {"through":"Etat_Courriel","onDelete":"CASCADE","onUpdate":"CASCADE"})

module.exports = { Courriel, Document, Etat, User }