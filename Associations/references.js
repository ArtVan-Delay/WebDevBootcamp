var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2");

var Post = require("./models/post");
var User = require("./models/user");

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });

Post.create({
    title: "How to cook the best burger part 4",
    content: "ssssssssssssssssssssssssssssssss"
}, function(err, post){
    User.findOne({email: "bob@gmail.com"}, function (err, foundUser){
        if(err) {
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data){
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            })
        }
    })
});

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user) {
//   if (err) {
//       console.log(err);
//   }  else {
//       console.log(user);
//   }
    
// });