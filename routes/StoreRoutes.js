const express = require("express");
const stores = express.Router();
const cors = require("cors");
const Store = require("../models/StoreModel");

stores.use(cors());

stores.post("/storesetting", (req, res) => {
  const date = new Date();
  today =
    parseInt(date.getMonth() + 1) +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear();
  const StoreData = {
    block_name: req.body.block_name,
    storenumber: req.body.storenumber,
    date: today,
    store_state: "Boş",
    store_email: "",
    store_name: "",
    store_surname: "",
    store_phoneno: "",
    style_box: "small-box bg-danger",
  };

  Store.create(StoreData)
    .then((store) => {
      res.json({ status: store.block_name + "Registered!" });
      res.json({ message: "false" });
    })
    .catch((err) => {
      res.json({ message: "true" });
    });
});
stores.post("/storesdelete", (req, res) => {
  Store.remove({ block_name: req.body.block_name })
    .then((objs) => {
      res.json(objs);
    })
    .catch((err) => {
      res.json({ error: "Store already exists" });
    });
});
//dükkan adı kontrol
stores.post("/findstore", (req, res) => {
  Store.findOne({
    storenumber: req.body.storenumber,
  }).then((store) => {
    if (!store) {
      res.send("true");
    } else {
      res.send("false");
    }
  });
});
stores.post("/storelist", (req, res) => {
  Store.find({ block_name: req.body.block_name }, function (err, objs) {
    var dbs = objs[0];

    return dbs;
  })
    .sort() //Alfabeye göre sıralama
    .then((build) => {
      if (build) {
        res.json(build);
      } else {
        res.json({ error: "Build already exists" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});
 stores.put("/storesupdate", (req, res) => {
  const blocksData = {
    storenumber: req.body.storenumber,
    store_state:req.body.store_state,
    store_name:req.body.store_name,
    store_surname:req.body.store_surname,
    store_phoneno:req.body.store_phoneno,
    style_box:req.body.style_box,
    store_email:req.body.store_email
    
  };
  Store.update({ storenumber: req.body.title_name }, blocksData, function(
    err,
    objs
  ) {})
    .then(stores => {
      res.json({ status: stores.storenumber + "Updated!" });
    })
    .catch(err => {
      res.json({ message: "true" });
    });
})
/* stores.post("/storelist", (req, res) => {
    Store.find({ block_name:req.body.block_name }, function(err, objs) {
    var dbs = objs[0];

    return dbs;
  })
    .sort({}) //Alfabeye göre sıralama
    .then(build => {
      if (build) {
        res.json(build);
      } else {
        res.json({ error: "Build already exists" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});
 */
/* personals.post("/personaldelete", (req, res) => {
  Personal.deleteOne({ phone_no: req.body.phone_no })
    .then(objs => {
      res.json(objs);
    })
    .catch(err => {
      res.json({ error: "Personal already exists" });
    });
}); */
module.exports = stores;
