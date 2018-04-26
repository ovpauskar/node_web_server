const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n" ,(err)=>{
    if(err){
      console.log("unable to append server.log file");
     }
  });
  next();
});

hbs.registerHelper("screamIt", (text) =>{
  return text.toUpperCase();
});

app.get("/", (req, res) =>{
  res.render("home.hbs", {
    title: "Home Page",
    welcomeMessage: "This is home page!",
    currentyear: new Date().getFullYear()
  });
});

app.get("/about",(req, res) =>{
  res.render("about.hbs", {
    page_title: "About page",
    currentyear: new Date().getFullYear()
  });
});

app.listen(port, ()=>{
  console.log(`server Started at port ${port}`);
});
