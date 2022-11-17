const router = require('express').Router();
const formidable = require('formidable');
const { base64_encode } = require('../utils/fileUtil')

const { upload, remove } = require('../api/uploader.api');
const filePath = "documents";

const { insertDocument, deleteDocument, getMyDocs } = require('../api/file.api');
const { MANAGER } = require('../utils/constants');
const { checkAuthenticated } = require('../utils/authUtil');

const userId = "636938e63170ad59f2e00506";

// endpoint to upload new files
// router.post('/' , checkAuthenticated, async (req, res, next) => {
router.post('/' , async (req, res, next) => {

    // change this when auth is implemented
    if (isAllowed({ type: req.user.type })) {

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

// endpoint to delete a file
router.delete('/:id' , async (req, res, next) => {

    // change this when auth is implemented
    if (isAllowed({ type: req.user.type })) {
        deleteDocument(req.params.id).then((result) => {
            res.json("successfully deleted!")
        }).catch((err) => {
            res.status(500).json(err);
        });
    }
    else
        res.status(401).json("Unauthorized!");

});

// endpoint to get files
router.get('/' , checkAuthenticated, async (req, res, next) => {
    console.log('req: file get user ', req.user.type);

    // change this when auth is implemented
    if (isAllowed({ type: req.user.type})) {
        getMyDocs(userId).then((result) => {
            res.json(result);
        }).catch((err) => {
            res.status(500).json(err);
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