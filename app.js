//----express.js connection----
var express = require("express");
var app = express();
var port = 4000;
var __dirname="E:/MDM";

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//---CORS enabling code on Server Side -------
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//---CORS enabling code on Server Side end-----

const server = 'localhost:27017'; //  DB SERVER
const database = 'MDM';      //  DB NAME

app.listen(port, () => {
    console.log("Server listening on port " + port);
   });


//----epress.js connection end-----


//----Database connection----
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost:27017/node-demo");

mongoose.connect(`mongodb://${server}/${database}`, {useNewUrlParser: true,useUnifiedTopology: true})
       .then(() => {
         console.log('Database connection successful');
         //getUserDetail();

       })
       .catch(err => {
         console.error('Database connection error')
       });

var dbConnectionSchema = new mongoose.Schema({
    dbType: String, 
    connectionName: String,
    hostName: String,
    port: String,
    userName: String,
    password: String,
    active: String
   }, { collection: 'dbConnection' });//---userDatas Document Properties



var dbConnectionModel = mongoose.model("dbConnection", dbConnectionSchema);//---creating modal userDatas for collection


//-----Database end----

//--rest api calls using express.js---
app.use("/home", (req, res) => {
    res.sendFile(__dirname + "/node_MDM/index.html");
    });  

app.get('/getdbConnectionDetails', async function(req, res) {
    let result = await dbConnectionModel.find({active:"Yes"});
    return res.json(result);
    });

app.post("/addDbDetails", (req, res) => {
    var myobj = req.body;
    myobj["active"] = "Yes";
    var myData = new dbConnectionModel(myobj);
   // console.log("myData="+myData);
    myData.save()
    .then(item => {
        console.log("res="+res.json());
        return "item saved to database";
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    });
    });


app.get('/getDbDetailsById/:Id', async function(req, res) {
   // console.log("id=="+req.userId);
    let Id = req.params.Id;
    let _filterquery={_id:Id};
    let result = await dbConnectionModel.find(_filterquery);
    console.log("result=="+result);
    return res.json(result);
    });
    
app.post('/updateById/:Id',async function(req,res){
    let Id = req.params.Id;
    let _filterquery={_id:Id};
    let _updatequery ={
        dbType:req.body.dbType,
        connectionName:req.body.connectionName,
        hostName:req.body.hostName,
        port:req.body.port,
        userName:req.body.userName,
        password:req.body.password
        };
    let result = await dbConnectionModel.findOneAndUpdate(_filterquery,_updatequery,{new: true});
    return res.json(result);
    })
app.post('/deleteById/:Id', async function(req, res) {
     let Id = req.params.Id;
     let _filterquery={_id:Id};
     let _updatequery ={active:"No"};
     let result = await dbConnectionModel.findOneAndUpdate(_filterquery,_updatequery,{new: true});
     return res.json(result);
     });

     
//---api calls end-----

