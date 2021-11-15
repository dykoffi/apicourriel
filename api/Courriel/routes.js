"use strict"

const router = require('express').Router()
const { Courriel, Etat, Document } = require('../../db/_relations')
const { db } = require('../../db/_index')
const Busboy = require('busboy')
const { join } = require('path')
const { cwd } = require('process')

const { randomBytes } = require('crypto')
const { createWriteStream, existsSync, mkdirSync } = require('fs')
const { extname } = require('path')


router

    /**
     * @descr Create new Courriel
     * @route POST /Courriel
     * @access public
     */

    .post("/", async (req, res) => {

        const t = await db.transaction()

        let busboy = new Busboy({ headers: req.headers })
        let filePath = join(cwd(), 'uploads')

        if (!existsSync(filePath)) mkdirSync(filePath)

        let fields = {}
        let files = []

        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {

            let fileSha = randomBytes(32).toString('hex')
            files.push({ name: filename, path: join('uploads', fileSha + extname(filename)), hash: fileSha })

            file
                .pipe(createWriteStream(join(filePath, fileSha + extname(filename))))

        })

        busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated) => {
            fields[fieldname] = val
        })

        busboy.on('finish', async () => {
            try {

                let courriel = await Courriel.create(fields, { transaction: t })
                let etat = await Etat.findByPk(fields['etatId'], { transaction: t })
                let documents = await Document.bulkCreate(files, { transaction: t })

                await courriel.addEtat(etat, { transaction: t })
                await courriel.addDocuments(documents, { transaction: t })

                res.status(201).json(courriel)
                t.commit()


            } catch (error) {
                await t.rollback();
                res.status(500).json({ error: error.name, message: error.message })
            }

        })

        req.pipe(busboy)

    })

    /**
    * @descr get all Courriel
    * @route GET /Courriel
    * @access public
    */

    .get("/", async (req, res) => {

        Courriel.findAll({ where: req.query, include: [{ model: Etat, attributes: { exclude: "Etat_Courriel" } }, { model: Document, attributes: { exclude: ['path'] } }], order: [['id', 'ASC']] })
            .then(data => {
                res.json(data)
            })
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
