import mongoose from "mongoose";

const inquireSchema = mongoose.Schema({
    id :{
        type: Number,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now(),
        required : true
    },
    response : {
        type : String, 
        required : false,
        default : ""
    },
    isResoved : {
        type : Boolean,
        required : true,
        default : false
    }
})

const Inquire = mongoose.model("inquire", inquireSchema);

export default Inquire;