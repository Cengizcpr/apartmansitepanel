const express = require("express");
const message = express.Router();
const cors = require("cors");

 const client = require('twilio')(
    "AC629ed88cd5e091fa3601760163c590fe",
    "4d9cbea50650dac0e5abea352d6f17b9"
  ); 

message.use(cors());
message.post('/messages', (req, res) => {
  

   client.messages
      .create({
        from: "+12058758346",
        to: req.body.to,
        body: req.body.body
      })
      .then(() => {
        res.send(JSON.stringify({ success: true }));
      })
      .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
      });
  });
  
module.exports = message;
