const db = require("../config/databaseConfig");
const dblink = "postgres://eqianzcf:7ZDWAamsBQ_WWFtA-lot8IYTuTT-HDqV@castor.db.elephantsql.com/eqianzcf"

const user = {
    //add new users
    addpost : function(title, content, callback){
        console.log("entered")
        var dbConn = db.connect(dblink);
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                callback(err, null);
            } else {
                dbConn.query("insert into posts(title, content) values(?,?);",[title, content],(error, results) => {
                    dbConn.end();
                    if (error) {
                        callback(error, null);
                    }
                    else if (results.length === 0) {
                        callback("Cannot find records", "Cannot find records");
                    }
                    else {
                        callback(null, results);
                    }
                });
            }
        });
    }, 
    getpost : function(callback){
        console.log("entered")
        var dbConn = db.connect(dblink);
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                callback(err, null);
            } else {
                dbConn.query("SELECT * FROM homework.posts where postid = (select max(postid) from homework.posts) LIMIT 1;", (error, results) => {
                    dbConn.end();
                    if (error) {
                        callback(error, null);
                    }
                    else if (results.length === 0) {
                        callback("Cannot find records", "Cannot find records");
                    }
                    else {
                        callback(null, results);
                    }
                });
            }
        });
    }
};

module.exports = user;