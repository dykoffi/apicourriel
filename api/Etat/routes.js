"use strict"

const router = require('express').Router()
const { Etat, Courriel } = require('../../db/_relations')

router

    /**
     * @descr Create new Etat
     * @route POST /Etat
     * @access public
     */

    .post("/", async (req, res) => {

        Etat.create(req.body)
            .then(data => { res.status(201).json(data) })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

    /**
    * @descr get all Etat
    * @route GET /Etat
    * @access public
    */

    .get("/", async (req, res) => {

        Etat.findAll({ where: req.query, order: [['id', 'ASC']] })
            .then(data => { res.json(data) })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

    /**
    * @descr Show specify Etat identified bi id
    * @route GET /Etat/id
    * @access public
    */

    .get("/:id", async (req, res) => {

        Etat.findByPk(req.params.id)
            .then(data => {
                if (data !== null) {
                    res.status(200).json(data)
                } else {
                    res.status(404).json({ message: "Etat not found" })
                }
            })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

    /**
    * @descr Modify specify Etat identified bi id
    * @route PUT /Etat/id
    * @access public
    */

    .put("/:id", async (req, res) => {

        Etat.update(req.body, { where: { id: req.params.id } })
            .then(data => {
                if (data[0] === 1) {
                    res.status(201).json({ message: "Etat updated succefully" })
                } else {
                    res.status(404).json({ message: "Etat not found" })
                }
            })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

    /**
    * @descr Delete specify Etat identified bi id
    * @route DELETE /Etat/id
    * @access public
    */

    .delete("/:id", async (req, res) => {

        Etat.destroy({ where: { id: req.params.id } })
            .then(data => {
                if (data === 1) {
                    res.status(201).json({ message: "Etat deleted succefully" })
                } else {
                    res.status(404).json({ message: "Etat not found" })
                }
            })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

module.exports = router
