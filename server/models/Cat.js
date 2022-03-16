const mongoose = require('mongoose');

let CatModel={};

//make a blueprint for how our db will be laid out
//name, # of beds,date e;ement was created
const catSchema = new mongoose.Schema({
    //what is a cat
    name:{
        type: String,
        //name is required
        required: true,
        unique: true,
        trim: true,

    },
    bedsOwned:{
        type: Number,
        min:0,
        required:true,

    },
    createdDate:{
        type: Date,
        //give it a function to default too
        default: Date.now,
    },
});

CatModel = mongoose.model('Cat',CatSchema);

module.exports = CatModel;