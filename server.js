const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.listen(port);

console.log("API server started on: " + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var userRoutes = require("./routes/userroutes");
var teamRoutes = require("./routes/teamRoutes")

userRoutes(app); 
teamRoutes(app); 

