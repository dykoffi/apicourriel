"use strict"

const router = require('express').Router()
const { Courriel } = require('../../db/_relations')

router

    /**
     * @descr Create new Courriel
     * @route POST /Courriel
     * @access public
     */

    .post("/", async (req, res) => {

        Courriel.create(req.body)
            .then(data => { res.status(201).json(data) })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

    /**
    * @descr get all Courriel
    * @route GET /Courriel
    * @access public
    */

    .get("/", async (req, res) => {

        Courriel.findAll({ where: req.query, order: [['id', 'ASC']] })
            .then(data => { res.json(data) })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

    /**
    * @descr Show specify Courriel identified bi id
    * @route GET /Courriel/id
    * @access public
    */

    .get("/:id", async (req, res) => {

        Courriel.findByPk(req.params.id)
            .then(data => {
                if (data !== null) {
                    res.status(200).json(data)
                } else {
                    res.status(404).json({ message: "Courriel not found" })
                }
            })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

    /**
    * @descr Modify specify Courriel identified bi id
    * @route PUT /Courriel/id
    * @access public
    */

    .put("/:id", async (req, res) => {

        Courriel.update(req.body, { where: { id: req.params.id } })
            .then(data => {
                if (data[0] === 1) {
                    res.status(201).json({ message: "Courriel updated succefully" })
                } else {
                    res.status(404).json({ message: "Courriel not found" })
                }
            })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

    /**
    * @descr Delete specify Courriel identified bi id
    * @route DELETE /Courriel/id
    * @access public
    */

    .delete("/:id", async (req, res) => {

        Courriel.destroy({ where: { id: req.params.id } })
            .then(data => {
                if (data === 1) {
                    res.status(201).json({ message: "Courriel deleted succefully" })
                } else {
                    res.status(404).json({ message: "Courriel not found" })
                }
            })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

module.exports = router
