const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
const cors = require("cors");
const fileUpload = require("express-fileupload");
var FormData = require("form-data");
var fs = require('fs');

app.use(express.urlencoded({ extended: true , limit: '25mb',parameterLimit: 1000000}));
app.use(cors());
app.use(express.json({limit: '25mb'}));
app.use(fileUpload());

let servers = [];
let index = 0;
let imageLista = undefined;

function sendImage(img) {
  form = new FormData()
  form.append("file", img.data ,img.name);
  form.submit(`http://localhost:${servers[index]}/transformImage`, function(err, res) {
  // res – response object (http.IncomingMessage)  //
  res.resume();
});

}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/sendImage",(req, res) => {
  if (index < servers.length) {
    sendImage(req.files.file);
    index = index + 1;
  } else {
    index = 0;
    sendImage(req.files.file);
  }

  setTimeout(()=>{
    res.json({ message: "Todo bien", file:imageLista });
  },1000)
});

app.post("/receiveImage",(req, res) => {
  console.log(req.files)
  imageLista = req.files.file
  imageLista.mv(`./img/${imageLista.name}`);

});

app.get("/register/:port", (req, res, next) => {
  let exist = false;
  if (servers.length != 0) {
    for (let i = 0; i < servers.length; i++) {
      if (servers[i] == req.params.port) {
        exist = true;
      }
    }
    if (!exist) {
      servers.push(req.params.port);
      res.json({ message: "Servidor Agregado Correctamente" });
      console.log(servers);
    } else {
      res.json({ message: "Servidor Ya habia sido agregado" });
    }
  } else {
    servers.push(req.params.port);
    console.log(servers);
    res.json({ message: "Servidor Agregado Correctamente" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
