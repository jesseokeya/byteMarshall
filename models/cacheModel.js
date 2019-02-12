
const mongoose = require('mongoose')

const cacheSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true
    },
    syntax: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    }
}, { timestamps: true })

const Cache = mongoose.model('Cache', cacheSchema )

module.exports = Cache