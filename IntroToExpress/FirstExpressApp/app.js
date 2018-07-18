var express = require("express");
var app = express();


//  "/"
app.get("/", function(req, res) {
    res.send("Hi there!");
});

// "/bye"
app.get("/bye", function(req, res) {
    res.send("Goodbye!");
});

// "/dog"
app.get("/dog", function(req, res) {
    res.send("WOOF!!!");
    console.log("Someone made a request to /dog");
});

// "/r/:subredditName" Example of route parameter usage
app.get("/r/:subredditName", function(req, res) {
    var subreddit = req.params.subredditName;
    res.send("WELCOME TO A " + subreddit.toUpperCase() +  " SUBREDDIT!"); 
});


// "/r/:subredditName/comments/:id/:title"
app.get("/r/:subredditName/comments/:id/:title", function(req, res){
    res.send("Welcome to the comments page!"); 
});

// "*"  Undefined routes catch all
app.get("*", function(req, res){
    res.send("YOU ARE A STAR!!");
})

// Setup Express to listen for requests (args specific to Cloud9 env)
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!!");
});