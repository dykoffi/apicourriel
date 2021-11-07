"use strict"

const router = require('express').Router()
const { User } = require('../../db/_relations')

router

    /**
     * @descr Create new User
     * @route POST /User
     * @access public
     */

    .post("/", async (req, res) => {

        User.create(req.body)
            .then(data => { res.status(201).json(data) })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

    /**
    * @descr get all User
    * @route GET /User
    * @access public
    */

    .get("/", async (req, res) => {

        User.findAll({ where: req.query, order: [['id', 'ASC']] })
            .then(data => { res.json(data) })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

    /**
    * @descr Show specify User identified bi id
    * @route GET /User/id
    * @access public
    */

    .get("/:id", async (req, res) => {

        User.findByPk(req.params.id)
            .then(data => {
                if (data !== null) {
                    res.status(200).json(data)
                } else {
                    res.status(404).json({ message: "User not found" })
                }
            })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

    /**
    * @descr Modify specify User identified bi id
    * @route PUT /User/id
    * @access public
    */

    .put("/:id", async (req, res) => {

        User.update(req.body, { where: { id: req.params.id } })
            .then(data => {
                if (data[0] === 1) {
                    res.status(201).json({ message: "User updated succefully" })
                } else {
                    res.status(404).json({ message: "User not found" })
                }
            })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

    /**
    * @descr Delete specify User identified bi id
    * @route DELETE /User/id
    * @access public
    */

    .delete("/:id", async (req, res) => {

        User.destroy({ where: { id: req.params.id } })
            .then(data => {
                if (data === 1) {
                    res.status(201).json({ message: "User deleted succefully" })
                } else {
                    res.status(404).json({ message: "User not found" })
                }
            })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

module.exports = router
