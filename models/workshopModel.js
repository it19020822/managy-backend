const mongoose = require('mongoose');
const schema = mongoose.Schema;

//-----WorkShop Schema------//

const workshopSchema = new schema({
    workshopName: {
        type: String,
        required: true
    },
    workshopDescription: {
        type: String,
        required: true
    },
    flyerURL: {
        type: String,
        required: true
    },
    resourcePersons: {
        type:Array
    },
    conferenceId: {
        type: String,
        required: true
    }
},{
    timestamps:true
});


module.exports = workShop = mongoose.model('workShop', workshopSchema); 