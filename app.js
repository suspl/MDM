
var express = require("express");
var mongoose = require("mongoose");
const expressgraphql = require('express-graphql');
const graphQlSchema = require('./graphql/schemas/index');
const graphQlResolvers = require('./graphql/resolvers/index');
var mysql = require('mysql');
//var con = require("./variable/variable")

var con;
var app = express();
var port = 4000;
var __dirname="E:/MDM/GraphQL";

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//---CORS enabling code on Server Side -------
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
  
//---CORS enabling code on Server Side end-----



//----Database connection----

const server = 'localhost:27017'; //  DB SERVER
const database = 'MDM';      //  DB NAME
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${server}/${database}`, {useNewUrlParser: true,useUnifiedTopology: true})
       .then(() => {
         console.log('Database connection successful');
         app.listen(port, () => { //----epress.js connection-----
          console.log("Server listening on port " + port);
          //-----MySql---
          con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database:"employee"
          });

          con.connect(function(err) {
            if (err) throw err;
            console.log("Mysql Connected!");
            //-------------------
            // con.query("SHOW DATABASES", function (err, result) {
            //   if (err) throw err;
            //   var rows = JSON.stringify(result);
            //   console.log("rows="+rows);
             
            //   // Object.keys(result).forEach(function(key) {
            //   //   var row = result[key];
            //   //   console.log(row.Database)
            //   // });
              
            // });
            //-----------
          });
          //--------Mysql end
         });

       })
       .catch(err => {
         console.error('Database connection error')
       });


//-----Database end----

app.use(
    '/graphql',
    expressgraphql({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true
    })
);

module.exports = con;
