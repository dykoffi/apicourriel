const { DataTypes } = require('sequelize')
const { protectField: $, init } = require('ciql-secry')

module.exports = init({

    Courriel: {
        attrs: {
            expediteur: { type: DataTypes.STRING },
            destinataire: { type: DataTypes.STRING },
            object: { type: DataTypes.STRING },
            hash: { type: DataTypes.STRING },
        },
        rels: [
            { type: "belongsToMany", model: "Etat", options: { through: 'Etat_Courriel' } },
            { type: "hasMany", model: "Document", options: { onDelete: 'RESTRICT', onUpdate: 'CASCADE' } }
        ]
    },

    Document: {
        attrs: {
            nom: { type: DataTypes.STRING },
            taille: { type: DataTypes.STRING },
            chemin: { type: DataTypes.STRING },
        }, rels: [
            { type: "belongsTo", model: "Courriel", options: { onDelete: 'RESTRICT', onUpdate: "CASCADE" } },
        ]
    },

    Etat: {
        attrs: {
            nom: { type: DataTypes.STRING },
            description: { type: DataTypes.STRING },
            color: { type: DataTypes.STRING }
        },
        rels: [
            { type: "belongsToMany", model: "Courriel", options: { through: 'Etat_Courriel', onDelete: "RESTRICT", onUpdate: 'CASCADE' } }
        ]
    },

    User: {
        attrs: {
            nom: { type: DataTypes.STRING },
            contact: { type: DataTypes.STRING },
            email: { type: DataTypes.STRING, validate: { isEmail: true } },
            login: { type: DataTypes.TEXT, ...$('login') },
            pass: { type: DataTypes.TEXT, ...$('pass') }
        }
    }

})