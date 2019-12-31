const DbConnectionModel = require('../../models/dbDetails');
var con = require("../../app");
//var mysql = require('mysql');
module.exports = {
    dbConnectionDetails: async () => {
        try {
            let result = await DbConnectionModel.find({active:"Yes"});
            console.log("result="+result);
            return result;
        } catch (err) {
        throw err;
        }
    }, 
    getDbDetailsById: async (args, req) => {
        try{
            let Id = args.Id;
            //console.log("Id="+Id);
            let _filterquery={_id:Id,active:"Yes"};
            let result = await DbConnectionModel.findOne(_filterquery);
            // console.log("result="+result);
            return result;
        }catch (err) {
        throw err;
        }
    },
    addDbDetails: async (args, req) => {
        try{
        // console.log("myobj="+args.dbInput.dbType);
            var myobj = args.dbInput;
            myobj["active"] = "Yes";
            var myData = new DbConnectionModel(myobj);
           // console.log("myData="+myData);
            myData.save();
            return myData;
        }catch (err) {
        throw err;
        }
    },
    updateDbDetailsById: async (args, req) => {
        try{
            let Id = args.Id;
            //console.log("Id="+Id);
            let _filterquery={_id:Id};
            let _updatequery ={
                    dbType:args.dbInput.dbType,
                    connectionName:args.dbInput.connectionName,
                    hostName:args.dbInput.hostName,
                    port:args.dbInput.port,
                    userName:args.dbInput.userName,
                    password:args.dbInput.password
                    };
            let result = await DbConnectionModel.findOneAndUpdate(_filterquery,_updatequery,{new: true});
            return result;
        }catch (err) {
        throw err;
        }
    },
    deleteByIdDbDetailsById: async (args, req) => {
        try{
            let Id = args.Id;
            //console.log("Id="+Id);
            let _filterquery={_id:Id};
            let _updatequery ={
                active:"No"
                };
            let result = await DbConnectionModel.findOneAndUpdate(_filterquery,_updatequery,{new: true});
            return result;
        }catch (err) {
        throw err;
        }
    },
    getDbList: async () => {
        try {
            //  con = mysql.createConnection({
            //     host: "localhost",
            //     user: "root",
            //     password: "",
            //     database:"employee"
            // });

            // con.connect(async function(err) {
            //     if (err) throw err;
            //     console.log("Mysql Connected!");
            //     //-------------------
            //     // con.query("SHOW DATABASES", function (err, result) {
            //     //   if (err) throw err;
            //     //   console.log("result="+result);
            //     //   var rows = JSON.stringify(result);
            //     //   console.log("rows="+rows);
                
            //     //   // Object.keys(result).forEach(function(key) {
            //     //   //   var row = result[key];
            //     //   //   console.log(row.Database)
            //     //   // });

            //     //   return rows;
                
            //     // });
            //     // let result = await con.query("SELECT * FROM employeemaster");
            //     // console.log("result--"+result);
            //     // return result;
            //     //-----------
            // });
            let result = await con.query("SELECT * FROM employeemaster");
            console.log("result--"+result);
            return result;

        } catch (err) {
        throw err;
        }
    }, 
  
};
