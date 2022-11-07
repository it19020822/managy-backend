const fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    const data = fs.readFileSync(file.filepath).toString('base64');
    // construct data uri and return
    const uri = `data:${file.mimetype};base64,${data}`
    return uri;
}

module.exports = { base64_encode };