const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Admin Şema Oluşturuldu.
const AdminSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },                                              
  password: {
    type: String,
    required: true
  },
  phone_no: {
    type: String,
    required: true
  },
  status: {
    type: Boolean
  },
  
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Admin = mongoose.model('admin', AdminSchema)
