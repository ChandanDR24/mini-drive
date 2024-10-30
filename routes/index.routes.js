const express = require('express')
const firebase = require('../config/firebase.config')
const authMiddleware = require('../middlewares/auth')
const index = express.Router();
const upload = require('../config/multer.config')
const fileModel = require('../models/file.models');
const file = require('../models/file.models');


index.get('/home',authMiddleware,async(req,res)=>{
    try{
        const userFiles = await fileModel.find({
            user:req.user.userId
        })
        res.render("home",{
            files:userFiles,
            user:req.user
        });
    }catch(err){
        res.status(500).json({
            message:"server error"
        })
    }
})

index.post('/upload',authMiddleware,upload.single('file'),async (req,res)=>{
    const newFile = await fileModel.create({
        path:req.file.path,
        originalname:req.file.originalname,
        user:req.user.userId
    })
    res.redirect("/home")
    // res.json(newFile)
})

index.get("/download/:path",authMiddleware,async(req,res)=>{
    const loggedInUserId = req.user.userId;
    const path = req.params.path;

    const file = await fileModel.findOne({
        user:loggedInUserId,
        path:path
    })
    if(!file){
        res.redirect("/user/login")
    }
    const signedUrl = await firebase.storage().bucket().file(path).getSignedUrl({
        action: 'read',
        expires: Date.now()+1000*60//only for the minute
    })

    res.redirect(signedUrl[0])
})
index.get("/logout", (req, res) => {
    // Clear the token by instructing the client to remove it
    res.clearCookie("token");  // Assuming token is stored in a cookie
    res.redirect("/");    // Redirect to login or home page
});

module.exports=index;