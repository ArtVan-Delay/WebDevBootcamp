var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app");

// Define schema
var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

// Create model to allow db manipulation of objects
var Cat = mongoose.model("Cat", catSchema);

// Create and save in db at once
Cat.create({
    name: "Krum",
    age: 9,
    temperament: "Asshole"
}, function(err, cat) {
    if (err) {
        console.log("SOMETHING WENT WRONG!");
    } else {
        console.log("WE JUST SAVED A CAT TO THE DB:");
        console.log(cat);
    }
})


// Create new Cat object
// var george = new Cat( {
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// // Attempt to save to db
// george.save(function(err, cat){
//     if (err) {
//         console.log("SOMETHING WENT WRONG!");
//     } else {
//         console.log("WE JUST SAVED A CAT TO THE DB:");
//         console.log(cat);
//     }
// });


//retrieve all cats from the DB
Cat.find({}, function(err, cats) {
  if (err) {
      console.log("ERROR: " + err);
  } else {
      console.log("CATS:");
      console.log(cats);
  }
});
