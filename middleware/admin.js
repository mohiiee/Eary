const adminAuth = (req,res,next)=>{
    const {admin}=req.headers;
    if(admin==1){
        next();
    }
    else{
        res.statusCode=403;
        res.send({
            "msg":"you are not authrized to enter here"
        })
    }
};
module.exports = adminAuth;