const mongoose=require("mongoose");
//author  SCHEMA
//schema is a blueprint of how data has to be constructed
//schema contains key value pairs such as (key :datatype);

const authorschema=mongoose.Schema(
    {
        
        id:Number,
        name:String,
        books:[String]

}

);
const authormodel=mongoose.model("author",authorschema);

//export module
module.exports=authormodel;