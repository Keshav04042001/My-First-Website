const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    Title: {
        type: String,
        //required: true
        default: "Notes"
    },
    upName:{
        type:String,
        required:false
    },
    Body: {
        type: String,
        //required: true
        default: "New Note"
    },
    Preference: {
        type: Number,
        default: 1,
        min: 1,
        max: 3
    },
    Created: {
        type: Date,
        default: Date.now()
    },
    Updated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Notes', notesSchema);
