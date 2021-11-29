
//add express server
const express = require("express");


//require mongoose so we can connect to our database.
const mongoose = require("mongoose");



//add body-parser to our node.js
const bodyParser = require("body-parser");
const date = require('date-and-time');
const app = express();


//we will add our .ejs files so we can use them as a template.
app.set("view engine", "ejs");

//add a folder named public with another folder inside named stylesheets so we can put our css in here.
app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: true }));


//connect our nodejs file to our database
mongoose.connect("mongodb://localhost:27017/myDB");

const now = new Date();
const value = date.addDays(now, 24);


//create your sample todo list schema
const mySchema = {
  name: {
    type: String,
    required: true
    },
    date: {
    type: Date,
    default: Date.now
    }
};

const Item = mongoose.model("Item", mySchema);



//GET Method:
app.get("/", function (req, res) {
  Item.find({}, function (err, f) {
    if (f.length === 0) {
      Item.insertMany(d, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved items to database");
        }
      });
      res.redirect("/");
    } else {
      res.render("todo", { newListItem: f });
    }
  });
});




//POST Method:
app.post("/", function (req, res) {
    //we will get input from our ejs file using req.body
  i = req.body.n;
  var t=req.body.h;
  const item = new Item({
    name: i,
    date:t,
  });
  //save that data in our data base
  item.save();
  //redirect to our orignal page after the update
  res.redirect("/");
});


//DElETE Method
app.post("/delete", function (req, res) {

    //we will find that text and remove using findByIdAndRemove.
  Item.findByIdAndRemove(req.body.remove, function (err) {
    if (!err) {
      console.log("Successfully deleted");
       //redirect to our orignal page after the update
      res.redirect("/");
    }
  });
});




//Next step would be dedicating a port number and telling our express app to listen to that port.
app.listen(8000, function () {
  console.log("running on port 8000.");
});