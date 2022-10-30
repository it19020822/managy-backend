const mongoose = require('mongoose');
const schema = mongoose.Schema;

const fileSchema = new schema({
    userId:{
        type:String,
        ref: "User",
        require:true
    },
    type:{
        type:String,
        require:false
    },
    publicId:{
        type:String,
        require:true
    },  
    fileUrl:{
        type:String,
        require:true
    }
},{
    timestamps: true
})

module.exports =document= mongoose.model('file',fileSchema);
