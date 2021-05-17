const mongoose=require("mongoose")
const validator=require("validator")
const UserMessageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email id")
            }
        }
    },
    contact:{
        type:Number,
        required:true
        // unique:true
    
    },
    message:{
        type:String,
        required:true
    
    }
    })
    // we need to create collection
    const Register= new mongoose.model("Register",UserMessageSchema);
    module.exports=Register;