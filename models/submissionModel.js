const mongoose  = require('mongoose');

const Schema  = mongoose.Schema;


    const submissionSchema  = new Schema ({
        topic : {type : String, required : true},
        deadline : {type : String, required : true},
        description : {type : String, required : true},
        conferenceId : {type : String, required : true},
     

},{
    timestamps:true
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;