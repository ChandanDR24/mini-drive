const express = require('express')
const userRouter = require('./routes/user.routes')
const indexRouter = require('./routes/index.routes')
// const userModel = require('./models/user.models')
const dotenv = require('dotenv')
const connectToDB = require('./config/db')
const cookieParser = require('cookie-parser')
const app = express()

app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});



dotenv.config();
connectToDB();
app.set('view engine','ejs')

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/user',userRouter)
app.use('/',indexRouter)

app.get('/',(req,res)=>{
    res.render('index',{title:'Home Page',message:'Welcome to our website'})

})

// process.on('uncaughtException',(err)=>{
//     console.log("uncaught error");
//     console.log(err);
// })

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
