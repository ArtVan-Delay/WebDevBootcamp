var express = require("express");
var app = express();


// "/"
app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!");
})

// "/speak/:animal"
app.get("/speak/:animal", function(req, res) {
    var animal = req.params.animal;
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof",
        horse: "Nay",
        cat: "Bite me, hooman"
    };
    var sound = sounds[animal];
    res.send("The " + animal + " says '" + sound + "'");
    

});

// "/repeat/:word/:times"
app.get("/repeat/:message/:times", function(req, res) {
   
   var message = req.params.message;
   var times = Number(req.params.times); 

   var output = "";
   for (var i=0; i<times; i++)
   {
       output += message + " ";
   }
   
   res.send(output);
});


// "*"  Catch all
app.get("*", function(req, res) {
    res.send("Sorry, page not found...");
})


// Setup Express to listen for requests (args specific to Cloud9 env)
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!!");
});

