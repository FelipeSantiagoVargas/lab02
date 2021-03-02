const express = require("express");
const app = express();
const port = 6000;
const axios = require("axios");
const fileUpload = require("express-fileupload");
var fs = require("fs");
var FormData = require("form-data");
app.use(
  express.urlencoded({ extended: true, limit: "25mb", parameterLimit: 1000000 })
);
app.use(express.json({ limit: "25mb" }));
app.use(fileUpload());

const Jimp = require("jimp");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/transformImage", (req, res) => {
  console.log(req.files.file);
  let img = req.files.file;
  img.mv(`./files/${img.name}`);

  var fileName = `conv-${img.name}`;
  var imageCaption = "Lo logramos crack SIUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU";
  var x = 0;
  var y = 0;
  var loadedImage;

  setTimeout(() => {
    Jimp.read(`files/${img.name}`)
      .then(function (image) {
        x = image.getWidth() / 10;
        y = image.getHeight() / 2;
        console.log(x);
        loadedImage = image;
        return Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
      })
      .then(function (font) {
        loadedImage.print(font, x, y, imageCaption);
        const img = loadedImage.write(fileName);
        return img;
      })
      .then((img) => {console.log(img)
        form = new FormData();
        form.append("file", img.bitmap.data, fileName);
        form.submit(
          `http://localhost:3000/receiveImage`,
          function (err, res) {
            // res – response object (http.IncomingMessage)  //
            res.resume();
          }
        );
      })
      .catch(function (err) {
        console.error(err);
      });
  }, 500);

  res.json({ message: "Imagen transformada, ahorita te la paso carnal" });
});

app.listen(port, () => {
  axios
    .get("http://localhost:3000/register/" + port, {})
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {});
  console.log(`Example app listening at http://localhost:${port}`);
});
