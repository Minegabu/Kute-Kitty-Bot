const { Schema, model } = require("mongoose")

const userSchema = new Schema({

    username: { type: String, required: true },

    cats: { type: Number, default: 1 }

})

module.exports = model('user', userSchema)
