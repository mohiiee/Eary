const { uuid } = require('uuidv4');
const router = require('express').Router()
const adminAuth = require('../middleware/admin')
const con=require('../db/connection')

const Users=[];


//Get Request --> Get ALL USERS
router.get('/Users', (req,res)=>{
    con.query("select * from user_model",(err,result,fields)=>{
        console.log(err,result,fields);
        res.json(result);
    });
});


//save new user
router.post('/CreatUser',adminAuth, (req,res) => {
    const data =req.body;
    Users.push({
        ID: uuid(),
        Name:data.Name,
        Role:data.Role,
    });
    res.send({
        msg:"User Created",
    });
});

//get specific user (search)
router.get('/Users/:ID',adminAuth, (req,res)=>{
    const { ID }= req.params;
    const UserInderx= Users.findIndex((item)=>item.ID==ID)
    if (UserInderx == -1){
        res.statusCode=404;
        res.send({
            "msg":"User not found"
        })
    }
    else {
        
        res.send(Users[UserInderx]);
    }
    
});
// put request -> update user by id
router.put('/Users/:ID',adminAuth, (req,res)=>{
    const { ID }= req.params;
    const data =req.body;
    const UserInderx= Users.findIndex((item)=>item.ID==ID)
    if (UserInderx == -1){
        res.statusCode=404;
        res.send({
            "msg":"User not found"
        })
    }
    else {
        Users[UserInderx].Name=data.Name;
        Users[UserInderx].Role=data.Role;
        res.json(Users[UserInderx]);
    }
});

// delete request -> delete user by id
router.delete('/Users/:ID',adminAuth, (req,res)=>{
    const { ID }= req.params;
    const UserInderx= Users.findIndex((item)=>item.ID==ID)
    if (UserInderx == -1){
        res.statusCode=404;
        res.send({
            "msg":"User not found"
        })
    }
    else {
        Users.slice(UserInderx,1);
        res.json({
            "msg":"user deleted"
        });
    }
});
module.exports = router;