const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Site Şema Oluşturuldu.
const BuildSchema = new Schema({
  build_name: {
    type: String
  },
  phone_no: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true
  },
  blocknumbers: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Build = mongoose.model('builds', BuildSchema)
