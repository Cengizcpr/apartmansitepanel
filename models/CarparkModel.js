const mongoose = require('mongoose')
const Schema = mongoose.Schema

// otopark Şema Oluşturuldu.
const CarparkSchema = new Schema({
  
   car_owner:{
    type:String
   },
   car_brand:{
    type:String
   },
   car_color:{
     type:String
   },
   car_email:{
     type:String
   },
   car_plate:{
    type:String
   },
    locations:{
     type:String
   },
   phone_no:{
     type:String
   },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = CarPark = mongoose.model('carpark', CarparkSchema)