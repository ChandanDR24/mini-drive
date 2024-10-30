const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[3,"username must be atleast 3 characters long."]
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,"email must be atleast 3 characters long."]
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,"password must be atleast 3 characters long."]
    },
})

const user = mongoose.model('user',userSchema);
module.exports=user;