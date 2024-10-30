const jwt =require('jsonwebtoken');

function auth(req,res,next) {
    const token = req.cookies.token;
    if(!token){//not a user
        
    }

    try {

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        return next();

    } catch (err) {
        res.redirect("/user/login");
    }

}

module.exports=auth;