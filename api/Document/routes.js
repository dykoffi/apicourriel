"use strict"

const router = require('express').Router()
const { Document } = require('../../db/_relations')
const { db } = require('../../db/_index')
const { join } = require('path')
const { cwd } = require('process')
const { rmSync } = require('fs')

const Busboy = require('busboy')

const { randomBytes } = require('crypto')
const { createWriteStream, existsSync, mkdirSync } = require('fs')
const { extname } = require('path')

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
    * @descr Add Document with specify courriel
    * @route POST /Document/id
    * @access public
    */

    .post("/:courrielId", async (req, res) => {

        const t = await db.transaction()

        let files = []

        let busboy = new Busboy({ headers: req.headers })
        let filePath = join(cwd(), 'uploads')

        if (!existsSync(filePath)) mkdirSync(filePath)

        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {

            let fileSha = randomBytes(32).toString('hex')
            files.push({ name: filename, path: join('uploads', fileSha + extname(filename)), hash: fileSha, CourrielId: req.params.courrielId })

            file
                .pipe(createWriteStream(join(filePath, fileSha + extname(filename))))

        })

        busboy.on('finish', async () => {
            try {

                await Document.bulkCreate(files, { transaction: t })
                res.status(201).json({message : "File added successfully"})
                t.commit()


            } catch (error) {
                await t.rollback();
                res.status(500).json({ error: error.name, message: error.message })
            }

        })

        req.pipe(busboy)
    })

    /**
    * @descr Delete specify Document identified bi id
    * @route DELETE /Document/id
    * @access public
    */

    .delete("/:id", async (req, res) => {

        Document.findByPk(req.params.id)
            .then(async data => {
                if (data) {
                    let file = data.getDataValue('path')
                    rmSync(join(file))
                    await Document.destroy({ where: { id: req.params.id } })
                    res.status(201).json({ message: "Document deleted successfully" })
                } else {
                    res.status(404).json({ message: "Document not found" })
                }
            })
            .catch(error => { res.status(500).json({ error: error.name, message: error.message }) })

    })

module.exports = router
