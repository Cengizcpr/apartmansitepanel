const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Admin Şema Oluşturuldu.
const UserSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  emailkul: {
    type: String,
    required: true
  },
  passwordkul: {
    type: String,
    required: true
  },
  phone_no: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('users', UserSchema)
