"use strict"

const { models : { Courriel, Document, Etat, User} } = require('./_index')

//Define Relationship between models


Courriel.belongsToMany(Etat, {"through":"Etat_Courriel","onDelete":"RESTRICT","onUpdate":"CASCADE"})
Courriel.hasMany(Etat, {"through":"Etat_Courriel","onDelete":"RESTRICT","onUpdate":"RESTRICT"})

Etat.belongsToMany(Courriel, {"through":"Etat_Courriel","onDelete":"RESTRICT","onUpdate":"CASCADE"})

module.exports = { Courriel, Document, Etat, User }