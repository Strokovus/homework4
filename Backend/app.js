//Router funcion
//get controller file
var express = require("express")
var app = express()
app.use(express.json());
var cors = require("cors");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.options('*', cors());
app.use(cors());
const path = require('path');

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });

// specific javascript code needed to run the various different functions
var user = require('./public/Services/users');
var logging = require("./public/middleware/logging");

//create new post
app.post("/posts", (req, res) => {
    logging.info("running")
    logging.info("post api: new post \n");
    logging.info(req.body.Title)
    logging.info(req.body.Content)
    console.log('entered')
    if (((req.body.Title && req.body.Content) && ((req.body.Title).trim() != "" && (req.body.Content).trim() != "")) == true) {

        user.addpost((req.body.Title).trim() , (req.body.Content).trim(), (error, results) => {
            if (error) {
                console.log("encountered some errors")
                console.log(error)
                res.status(500).send(error);
            } else {
                console.log("Added smoothly")
                res.status(200).send(results);
            }
        });
        logging.info("end of add post api")
    }else {
        res.status(404).send(error); 
    }
});

app.get("/posts/", (req, res) => {
    logging.info("running")
    logging.info("post api: new get Latest API \n");
    console.log('entered')
    user.getpost((error, results) => {
        if (error) {
            console.log("encountered some errors")
            console.log(error)
            res.status(500).send(error);
            logging.info("error: " + error)
        } else {
            console.log("Added smoothly")
            res.status(200).send(results);
            logging.info("successfully retrieved")
        }
    });
});

module.exports = app;