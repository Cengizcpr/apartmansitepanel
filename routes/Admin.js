const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/AdminModel");
users.use(cors());

process.env.SECRET_KEY = "secret";

users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today,
    phone_no: req.body.phone_no,
    status: req.body.status
  };

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.send("true")
            })
            .catch((err) => {
              res.send("false")
            });
        });
      } else {
        res.send("err")
      }
    }).catch((err) => {
      res.send(err);
    });
    
});
//şifre kontrol
users.post("/controlpassword", (req, res) => {
  if (bcrypt.compareSync(req.body.current_password, req.body.system_pas)) {
    res.send("true");
  } else {
    res.send("false");
  }
});
//şifre update
users.put("/newpassword", (req, res) => {
  const userData = {
    password: req.body.new_password,
  };
  bcrypt.hash(req.body.new_password, 10, (err, hash) => {
    userData.password = hash;

    User.update({ _id: req.body._id }, userData, function (err, objs) {})
      .then((user) => {
        res.send("true");
      })
      .catch((err) => {
        res.send("false");
      });
  });
});
users.put("/userupdate", (req, res) => {
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_no: req.body.phone_no,
    _id: req.body._id,
  };
  /* User.find({
    email: { $ne: req.body.email },
  })
    .then((user) => {
      if (user) { */
  User.update({ _id: req.body._id }, userData, function (err, objs) {})
    .then((user) => {
      res.json({ status: "Updated!" });
    })
    .catch((err) => {
      res.json({ message: "true" });
    });
 // }
/*     else {
      res.send("err")
    }
  }).catch((err) => {
    res.send(err);
  }); */
});
users.post("/useradd", (req, res) => {
  const date = new Date();
  today =
    parseInt(date.getMonth() + 1) +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    email: req.body.email,
    phone_no: req.body.phone_no,
    date: today,
    status: false,
  };

  
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.send("true")
            })
            .catch((err) => {
              res.send("false")
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      res.send("error");
    });
});
users.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.send(token);
        } else {
          // Passwords don't match
          res.json({ error: "User does not exist" });
        }
      } else {
        res.json({ error: "User does not exist" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

users.get("/adminprofile", (req, res) => {
  User.find({}, function (err, objs) {
    var dbs = objs[0];
    //console.log(dbs);
    return dbs;
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.json({ error: "Admin already exists" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

users.post("/userdelete", (req, res) => {
  User.deleteOne({ _id: req.body._id })
    .then((objs) => {
      res.json(objs);
    })
    .catch((err) => {
      res.json({ error: "User already exists" });
    });
});

module.exports = users;
