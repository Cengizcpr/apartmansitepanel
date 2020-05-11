const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Arıza Şema Oluşturuldu.
const FaultSchema = new Schema({
  
    fault_owner:{
    type:String
   },
   fault_locations:{
    type:String
   },
   fault_name:{
     type:String
   },
   fault_type:{
     type:String
   },
   fault_comment:{
    type:String
   },
   fault_priority:{
     type:String
   },
   fault_state:{
     type:String
   },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Fault = mongoose.model('fault', FaultSchema)