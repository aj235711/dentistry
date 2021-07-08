const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectName:{
        type: String,
        required: true,
    },user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },published:{
        type: Boolean,
        default: False,
    },date:{
        type:Date,
        required: true,
    },submission:[{
        type:{
            introduction:[Number],
            methodology:[Number],
            results:[Number],
            discussion:[Number],
            conclusion:[Number],
            abstract:[Number],
            references:[Number],
            generalWriting:[Number],
        }
    }]
})