import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    key:{
        type : String,
        required : true,
        unique : true
    },
    name :{
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    image : {
        type : [String],
        required : true,
        default : ["https://th.bing.com/th/id/OIP.mhEjokf4cHBCeCsOqohUdwHaHa?rs=1&pid=ImgDetMain"]
    },
    category : {
        type : String,
        required : true,
        default : "uncategorize"
    },
    diemension : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    availability : {
        type : Boolean,
        require : true,
        default : true
    },
});

const Product = mongoose.model("product", productSchema);

export default Product;