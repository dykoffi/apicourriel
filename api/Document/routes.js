"use strict"

const router = require('express').Router()
const { Document } = require('../../db/_relations')

router

    /**
     * @descr Create new Document
     * @route POST /Document
     * @access public
     */

    .post("/", async (req, res) => {

        Document.create(req.body)
            .then(data => { res.status(201).json(data) })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

    /**
    * @descr get all Document
    * @route GET /Document
    * @access public
    */

    .get("/", async (req, res) => {

        Document.findAll({ where: req.query, order: [['id', 'ASC']] })
            .then(data => { res.json(data) })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

    /**
    * @descr Show specify Document identified bi id
    * @route GET /Document/id
    * @access public
    */

    .get("/:id", async (req, res) => {

        Document.findByPk(req.params.id)
            .then(data => {
                if (data !== null) {
                    res.status(200).json(data)
                } else {
                    res.status(404).json({ message: "Document not found" })
                }
            })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

    /**
    * @descr Modify specify Document identified bi id
    * @route PUT /Document/id
    * @access public
    */

    .put("/:id", async (req, res) => {

        Document.update(req.body, { where: { id: req.params.id } })
            .then(data => {
                if (data[0] === 1) {
                    res.status(201).json({ message: "Document updated succefully" })
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
