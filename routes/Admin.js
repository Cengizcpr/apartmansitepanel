const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/AdminModel')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today,
    phone_no:req.body.phone_no,
    status:true
  }

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
             res.json({ status: user.email + 'Registered!' })
           res.json({ message: "false"})
            })
            .catch(err => {
              res.json({ message: "true"})
               
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
users.post('/useradd', (req, res) => {
  const date = new Date(); 
  today= parseInt(date.getMonth()+1)+"/"+date.getDate() +"/"+date.getFullYear();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password:req.body.password,
    email:req.body.email,
    phone_no: req.body.phone_no,
    date: today,
    status:false
  }

  User.findOne({
    phone_no: req.body.phone_no
  })
  .then(user => {
    if (!user) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        userData.password = hash
        User.create(userData)
          .then(user => {
           res.json({ status: user.email + 'Registered!' })
         res.json({ message: "false"})
          })
          .catch(err => {
            res.json({ message: "true"})
             
          })
      })
    } else {
      res.json({ error: 'User already exists' })
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})
users.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
          }
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
         res.send(token)
          
        } else {
          // Passwords don't match
          res.json({ error: 'User does not exist' })
        }
      } else {
        res.json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/adminprofile', (req, res) => {

  User.find({},function(err,objs){
    var dbs=objs[0];
    //console.log(dbs);
    return dbs
  })
    .then(user => {
      if (user) {
       
        res.json(user)
      } else {
        res.json({ error: 'Admin already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = users
