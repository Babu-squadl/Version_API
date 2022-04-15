const express = require("express");
const res = require("express/lib/response");
const version = require("nodemon/lib/version");
const mysql = require("mysql");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extened:true}))
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"User@123",
    database:"pazybill",
});

con.connect(function(err){
    if(err) throw err;
    con.query("select version as latest_version from app_version order by s_no desc limit 1",function(err,result,field){
        // const ans = JSON.parse(result);
        if (err) throw err;
        else
        app.get("/",function(req,res){
            res.send({
                status_code : 200,
                message : 'latest mobile version',
                status : 'success',
                version : result[0].latest_version
            }).status(200)
        })
        console.log(result);
    })
})



app.listen(3000, function () {
    console.log('Server started on port 3000!')
});