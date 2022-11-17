const router = require('express').Router();
const formidable = require('formidable');
const { base64_encode } = require('../utils/fileUtil')

const { upload, remove } = require('../api/uploader.api');
const filePath = "documents";

const { insertDocument } = require('../api/file.api');
const { MANAGER } = require('../utils/constants');
const { checkAuthenticated } = require('../utils/authUtil');

// endpoint to upload new files
router.post('/' , checkAuthenticated, async (req, res, next) => {

    // change this when auth is implemented
    if (isAllowed({ type: MANAGER })) {

        const form = formidable({ multiples: true });

        form.parse(req, (err, fields, files) => {

            if (err) {
                console.log(err);
                next(err);
                return;
            }

            const base64File = base64_encode(files.file);

            upload(base64File, filePath).then((doc) => {

                insertDocument(doc, null).then((result) => {
                    res.json("File upload successful!");
                }).catch((err) => {
                    res.status(500).json(err);
                })
            }).catch((error) => {
                res.status(500).json(error);
            });

        });
    }
    else
        res.status(401).json("Unauthorized!");

});

// endpoint to upload new files
router.delete('/:id' , async (req, res, next) => {

    // change this when auth is implemented
    if (isAllowed({ type: MANAGER })) {

        const form = formidable({ multiples: true });

        form.parse(req, (err, fields, files) => {

            if (err) {
                console.log(err);
                next(err);
                return;
            }

            const base64File = base64_encode(files.file);

            upload(base64File, filePath).then((doc) => {

                insertDocument(doc, null).then((result) => {
                    res.json("File upload successful!");
                }).catch((err) => {
                    res.status(500).json(err);
                })
            }).catch((error) => {
                res.status(500).json(error);
            });

        });
    }
    else
        res.status(401).json("Unauthorized!");

});

// checks if the user is allowed to access the file api endpoints
const isAllowed = (user) => {
    return user.type === MANAGER ? true : false
}

module.exports = router;