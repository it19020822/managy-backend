const mongoose = require('mongoose');

const schema = mongoose.Schema;

const messageSchema = new schema({
    userId:{
        type:String,
        ref: "User",
        require:true
    },
    message: {
        type: String
    }
},{
    timestamps: true
});

module.exports = payment = mongoose.model('message',messageSchema);