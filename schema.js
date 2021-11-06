const { DataTypes } = require('sequelize')
const { protectField: $ } = require('ciql-secry')

module.exports = {
    Courriel: {
        attributes: {
            expediteur: { type: DataTypes.STRING },
            destinataire: { type: DataTypes.STRING },
            object: { type: DataTypes.STRING },
        }
    },
    Document: {
        attributes: {
            nom: { type: DataTypes.STRING },
            taille: { type: DataTypes.STRING },
            chemin: { type: DataTypes.STRING },
        }
    },
    Etat: {
        attributes: {
            nom: { type: DataTypes.STRING },
            description: { type: DataTypes.STRING },
        }
    }
}