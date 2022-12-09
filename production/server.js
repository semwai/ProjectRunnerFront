// libs
const express = require("express");
const path = require("path");
// create server
const app = express();

const PORT = 80;
const BUILD_FOLDER = "build";

app.use(express.static(path.join(__dirname, BUILD_FOLDER)));

app.get('/*', function (req, res) {
    console.log(req.method, req.ip, req.url)
    res.sendFile(path.join(__dirname, BUILD_FOLDER, "index.html"), (err) => {
        console.error(err)
        res.sendStatus(404)
    });

});

app.listen(PORT);