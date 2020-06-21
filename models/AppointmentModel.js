const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Randevu Şema Oluşturuldu.
const AppointmentSchema = new Schema({
  
    name_surname:{
    type:String
   },
   phone_no:{
     type:String
   },
   appo_title:{
    type:String
   },
   appo_subject:{
     type:String
   },
   appo_comment:{
     type:String
   },
   appo_state:{
     type:Boolean
   },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Appointment = mongoose.model('appointment', AppointmentSchema)