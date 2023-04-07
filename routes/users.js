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


//save new user (register new user) 

router.post('/register',(req,res)=>{
    const data=req.body;
    con.query('insert into user_model set ?',{Name:data.Name,Email:data.Email,Password:data.Password,Phone:data.Phone},
    (err,result,fields)=>{
        if(err){
            res.statusCode=400;
            res.json({msg:"register failed",
        });}
    else{
        res.json({
            msg:"user created",
        });
    }
        }
    );
});


//get specific user (search)
router.get('/Users/:Email', (req,res)=>{
    const { Email }= req.params;
    con.query("select * from user_model where ?",{Email : Email},(err,result,fields)=>
    {
        if (result[0]) {
        res.json(result);
        }
        else {
            res.statusCode =404;
            res.json({
                msg:"user not found"
            })
        }
    });
});
    
    
//update data (to change from in-active to active )
router.put('/Users/:Email', (req,res)=>{
    const { Email }= req.params;
    const data =req.body;
    con.query("update user_model set ? where Email = ?",[{ Status : data.Status},Email],(err,result)=>{
    if (err){
        res.statusCode=500;
        res.json({msg:"cant update user"});
    }
    res.json({msg:"updated succ."});
});
});

// delete request -> delete user by id
router.delete('/Users/:Email', (req,res)=>{
    const { Email }= req.params;
    con.query("delete from user_model where ?",{Email:Email},(err,result)=>{
        if (err){
            res.statusCode=500
            res.json({
                msg:"failed to delete user"
            })
        }
        res.json({msg:"user deleted"})
    })
});
module.exports = router;