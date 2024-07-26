const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("node:https");
const client = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const fEmail = req.body.fEmail;

  const data = {
    members: [
      {
        email_address: fEmail,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      },
    ],
  };

  let jsonData = JSON.stringify(data);

  const url = "https://us22.api.mailchimp.com/3.0/lists/bb186f81b3";
  const options = {
    method: "POST",
    auth: "prapti:a4c5526ff900462f959191204bf03d23-us22",
  };

  const request = https.request(url, options, function (response, body) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.listen(3000, function () {
  console.log("Listening on 3000");
});

//API Key
//a4c5526ff900462f959191204bf03d23-us22

// Audience ID
// bb186f81b3
