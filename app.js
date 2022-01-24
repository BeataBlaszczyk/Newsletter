//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}))



app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

});


app.post("/", function(req, res) {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  }

  var jsonData = JSON.stringify(data);

  const url = "https://us20.api.mailchimp.com/3.0/lists/e0b49f21f6"

  const options = {
    method: "POST",
    auth: "beata1:0a003dd5bf4996177a26adcc625404fb-us20"
  }

  const request = https.request(url, options, function(response) {
      response.on("data", function(data) {


        console.log(JSON.parse(data));
      })
      if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  })


request.write(jsonData); request.end();
});

// https.get(url, function(res, req){
//   console.log(res.statusCode);
// })

app.post("/failure", function(req, res){
  //res.sendFile(__dirname + "/signup.html");
  res.redirect("/");
})


app.listen(process.env.PORT || 3000, function() {
  console.log("blablabla");
})




//api key
//0a003dd5bf4996177a26adcc625404fb-us20

//list id
// e0b49f21f6
