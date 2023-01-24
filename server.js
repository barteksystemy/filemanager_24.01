const express = require("express");
const formidable = require("formidable");
const app = express();
const PORT = 3000;
const fs = require("fs");
const path = require("path");
var hbs = require("express-handlebars");
app.use(express.static("static"));

// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

app.post("/filemanager", function (req, res) {
  let form = formidable({});
  form.multiples = true;
  form.keepExtensions = true; // zapis z rozszerzeniem pliku
  form.uploadDir = __dirname + "/static/upload/"; // folder do zapisu zdjęcia
  form.parse(req, function (err, fields, files) {
    console.log("----- przesłane pola z formularza ------");

    console.log(fields);

    console.log("----- przesłane formularzem pliki ------");

    console.log(files);

    res.send("plik przesłany!");
  });
});

app.get("/filemanager", function (req, res) {
  res.render("filemanager.hbs");
});

app.engine(
  "hbs",
  hbs({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: path.join(__dirname, "/views/layouts"),
    partialsDir: path.join(__dirname, "/views/partials"),
  })
);
app.set("views", __dirname + "/views");

app.set("view engine", "hbs");
//listen
app.listen(PORT, function () {
  console.log("start serwera na porcie: " + PORT);
});
