const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Dükkan Şema Oluşturuldu.
const StoreSchema = new Schema({
  block_name: {
    type: String
  },
  storenumber: {
    type: String
  },
  store_state:{
    type:String
   },
   store_name:{
     type:String
   },
   store_surname:{
    type:String
   },
   store_phoneno:{
    type:String
   },
   style_box:{
     type:String
   },
   store_email:{
     type:String
   },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Apartmen = mongoose.model('stores', StoreSchema)
