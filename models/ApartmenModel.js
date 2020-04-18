const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Site Şema Oluşturuldu.
const ApartmenSchema = new Schema({
  block_name: {
    type: String
  },
  circlenumber: {
    type: String
  },
   host_state:{
    type:String
   },
   host_name:{
     type:String
   },
   host_surname:{
    type:String
   },
   host_phoneno:{
    type:String
   },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Apartmen = mongoose.model('apartmens', ApartmenSchema)
