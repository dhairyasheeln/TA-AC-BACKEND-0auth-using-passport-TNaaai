var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var userSchema=new Schema({
    name:{type:String},
    username:{type:String,required:true},
    email:{type:String,required:true},
    photo:{type:String}
});

var User=mongoose.model('User',userSchema);
module.exports=User;