module.exports = function(req,res,next){
    if(req.user.isAdmin || req.user.isSuperAdmin){
        //do nothing
    }else{
        return res.status(403).send("Access denied, Not authorized");
    }

    next();
}