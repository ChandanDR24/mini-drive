const express = require('express');
const userModel = require('../models/user.models')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register',{error:null})
})

router.post('/register',
    body('email').trim().isEmail().isLength({ min: 10 }),
    body('password').trim().isLength({ min: 3 }),
    body('username').trim().isLength({ min: 3 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("register", { error: "invalid data" });
            
        }
        const { email, username, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            email,
            username,
            password: hashPassword
        })

        res.redirect("/home")
    })

router.get('/login', (req, res) => {
    res.render('login',{error:null})
})
router.post('/login',
    body('username').trim().isLength({ min: 3 }),
    body('password').trim().isLength({ min: 3 })
    , async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render("login", { error: "invalid data" });
        }

        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        if(!user){
            return res.render("login", { error: "Username or password is incorrect" });

        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.render("login", { error: "Username or password is incorrect" });
        }

        // json web token and bcrypt
        const token = jwt.sign({
            userId:user._id,
            email:user.email,
            username:user.username
        },process.env.JWT_SECRET,)

        res.cookie('token',token)
        // req.session.user=user;
        res.redirect("/home")

    })  

module.exports = router;