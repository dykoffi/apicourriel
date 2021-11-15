"use strict"

const router = require('express').Router()
const { Document } = require('../../db/_relations')
const { join } = require('path')
const { cwd } = require('process')

router

    .get("/:hash", async (req, res) => {

        Document.findOne({ where: { hash: req.params.hash } })
            .then(data => {
                if (data !== null) {
                    let file = join(cwd(), data.getDataValue('path'))
                    res.status(200).sendFile(file)
                } else {
                    res.status(404).json({ message: "Document not found" })
                }
            })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

    /**
    * @descr Delete specify Document identified bi id
    * @route DELETE /Document/id
    * @access public
    */

    .delete("/:id", async (req, res) => {

        Document.destroy({ where: { id: req.params.id } })
            .then(data => {
                if (data === 1) {
                    res.status(201).json({ message: "Document deleted succefully" })
                } else {
                    res.status(404).json({ message: "Document not found" })
                }
            })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

module.exports = router
