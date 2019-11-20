const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    name : {type:String,required:true},
    email : {type :String,required:true, unique:true,match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/},
    password : {type:String,required:true},
    versionKey: false
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('users',userSchema);