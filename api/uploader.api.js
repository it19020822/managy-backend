const cloudinary = require('../config/cloudinary');

function upload(data, folder) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(data, { folder: folder, use_filename: true, },
            function (error, result) {
                result ? resolve(result) : reject(error)
            });
    })
}

function remove(publicId) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, function (err, result) {
            result ? resolve(result) : reject(err)
        });
    })
}

module.exports = { upload, remove }