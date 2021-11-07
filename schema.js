const { DataTypes } = require('sequelize')
const { protectField: $ } = require('ciql-secry')

module.exports = {

    Courriel: {
        attributes: {
            expediteur: { type: DataTypes.STRING },
            destinataire: { type: DataTypes.STRING },
            object: { type: DataTypes.STRING },
        },
        associations: [
            { type: "belongsToMany", model: "Etat", options: { through: 'Etat_Courriel', onDelete: 'RESTRICT', onUpdate: 'CASCADE' } },
            { type: "hasMany", model: "Document", options: { onDelete: 'RESTRICT', onUpdate: 'CASCADE' } }
        ]
    },

    Document: {
        attributes: {
            nom: { type: DataTypes.STRING },
            taille: { type: DataTypes.STRING },
            chemin: { type: DataTypes.STRING },
        }, association: [
            { type: "belongsToOne", model: "Courriel", options: { onDelete: 'RESTRICT', onUpdate: 'CASCADE' } }
        ]
    },

    Etat: {
        attributes: {
            nom: { type: DataTypes.STRING },
            description: { type: DataTypes.STRING },
        },
        associations: [
            { type: "belongsToMany", model: "Courriel", options: { through: 'Etat_Courriel', onDelete: 'RESTRICT', onUpdate: 'CASCADE' } }
        ]
    },

    User: {
        attributes: {
            nom: { type: DataTypes.STRING },
            contact: { type: DataTypes.STRING },
            email: { type: DataTypes.STRING, validate: { isEmail: true } },
            login: { type: DataTypes.TEXT, ...$('login') },
            pass: { type: DataTypes.TEXT, ...$('pass') }
        },
    }


}