const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Personel Şema Oluşturuldu.
const PersonalSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  phone_no: {
    type: String
  },
  adress: {
    type: String
  },
  departmans: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Personal = mongoose.model('personals', PersonalSchema)
