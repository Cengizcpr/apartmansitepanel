const express = require('express')
const personals = express.Router()
const cors = require('cors')
const Personal = require('../models/PersonalModel')

personals.use(cors())

personals.post('/personaladd', (req, res) => {
  const date = new Date(); 
  today= parseInt(date.getMonth()+1)+"/"+date.getDate() +"/"+date.getFullYear();
  const personalsData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    adress: req.body.adress,
    phone_no: req.body.phone_no,
    departmans: req.body.departmans,
    date: today
  }

  Personal.findOne({
    phone_no: req.body.phone_no
  })
    .then(personals => {
      if (!personals) {
       
        Personal.create(personalsData)
            .then(personals => {
             res.json({ status: personals.phone_no + 'Registered!' })
           res.json({ message: "false"})
                console.log(personals)
            })
            .catch(err => {
              res.json({ message: "true"})
              console.log(err) 
            })
       
      } else {
        res.json({ error: 'Personals already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
personals.get('/personallist', (req, res) => {

  Personal.find({},function(err,objs){
    var dbs=objs[0];
   
    return dbs
  })
    .then(personals => {
      if (personals) {
       
        res.json(personals)
      } else {
        res.json({ error: 'personals already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
personals.post('/personaldelete', (req, res) => {

  Personal.deleteOne({phone_no:req.body.phone_no})
     .then(objs=> {
        
       res.json(objs)
     })
     .catch(err=>{
       res.json({ error: 'Personal already exists' })
     })
  
 
 })
module.exports = personals
