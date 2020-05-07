const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Apartman Şema Oluşturuldu.
const ApartmenSchema = new Schema({
  block_name: {
    type: String
  },
  circlenumber: {
    type: Number
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
   style_box:{
     type:String
   },
   host_email:{
     type:String
   },
   car_numbers:{
    type:String
   },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Apartmen = mongoose.model('apartmens', ApartmenSchema)
