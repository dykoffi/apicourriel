"use strict"

const { models : { Courriel, Document, Etat, User} } = require('./_index')

//Define Relationship between models


Courriel.belongsToMany(Etat, {"through":"Etat_Courriel"})
Courriel.hasMany(Document, {"onDelete":"RESTRICT","onUpdate":"CASCADE"})

Document.belongsTo(Courriel, {"onDelete":"RESTRICT","onUpdate":"CASCADE"})
Document.belongsTo(Etat)

Etat.belongsToMany(Courriel, {"through":"Etat_Courriel","onDelete":"RESTRICT","onUpdate":"CASCADE"})

module.exports = { Courriel, Document, Etat, User }