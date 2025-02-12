const mongoose = require('mongoose');


const projectSchema = mongoose.Schema({

    title: String,
    url: String,
    tag: String,
    content: String,
});

module.exports = mongoose.model('Project', projectSchema);