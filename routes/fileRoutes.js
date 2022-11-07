const router = require('express').Router();
const formidable = require('formidable');
const { base64_encode } = require('../utils/fileUtil');

const { upload, remove } = require('../api/uploader.api');
const filePath = "documents";

const { insertDocument } = require('../api/file.api')

router.post('/', async (req, res, next) => {

    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {

        if (err) {
            console.log(err);
            next(err);
            return;
        }

        const base64File = base64_encode(files.file);

        upload(base64File, filePath).then((doc) => {

            insertDocument(doc).then((result) => {
                res.json("File upload successful!");
            }).catch((err) => {
                res.status(500).json(err);
            })
        }).catch((error) => {
            res.status(500).json(error);
        });

    });

});

module.exports = router;