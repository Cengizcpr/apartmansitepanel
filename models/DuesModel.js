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
   duesMonth:{
    type:String
  },
   amount:{
    type:Number
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