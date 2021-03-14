var mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
    time: Number,
    input: String,
        output: String,
        lang: String,
        accepted: Boolean
});

module.exports = mongoose.model('Session',SessionSchema);