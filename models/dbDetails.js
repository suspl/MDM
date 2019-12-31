const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var dbConnectionSchema = new Schema({
    dbType: String, 
    connectionName: String,
    hostName: String,
    port: String,
    userName: String,
    password: String,
    active: String
   }, { collection: 'dbConnection' });//---userDatas Document Properties



//var dbConnectionModel = mongoose.model("dbConnection", dbConnectionSchema);//---creating modal userDatas for collection
module.exports = mongoose.model('dbConnection', dbConnectionSchema);