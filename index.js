const express = require('express')
const bodyParser =require("body-parser")
const app =express()
const adminn = require("./middleware/admin")
const users=require("./routes/users");
const con=require('./db/connection')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//API REQUEST
// get request --> get datarom server
//post request -->sava  data
// put request --> update data 
// delete request-->delete data from server

app.use("",users);



app.listen(4000,"localhost",()=>{
    console.log("Serever started");
});