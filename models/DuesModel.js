const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Aidat Şema Oluşturuldu.
const DuesSchema = new Schema({
  
    duesYearMonth:{
    type:String
   },
   duesGroup:{
     type:String
   },
   amount:{
    type:String
   },
   payment_date:{
     type:String
   },
   operation_date:{
     type:String
   },
   duesComment:{
    type:String
   },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Dues = mongoose.model('dues', DuesSchema)