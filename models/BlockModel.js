const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Site Şema Oluşturuldu.
const BlockSchema = new Schema({
  block_name: {
    type: String
  },
  circlenumber: {
    type: String
  },
  storenumber: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Block = mongoose.model('blocks', BlockSchema)
