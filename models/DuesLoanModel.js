const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Aidat Borç Şema Oluşturuldu.
const DuesLoanSchema = new Schema({
  duesYearMonth: {
    type: String,
  },
  duesGroup: {
    type: String,
  },
  duesMonth: {
    type: String,
  },
  duesYear: {
    type: String,
  },
  amount: {
    type: Number,
  },
  loanPersonName: {
    type: String,
  },
  loanPersonPhoneno: {
    type: String,
  },
  loanGroupName: {
    type: String,
  },
  loanState: {
    type: String,
  },
  payment_date: {
    type: String,
  },
});

module.exports = DuesLoan = mongoose.model("duesloan", DuesLoanSchema);
