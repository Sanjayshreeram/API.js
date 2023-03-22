const mongoose=require("mongoose");
//publication  SCHEMA
//schema is a blueprint of how data has to be constructed
//schema contains key value pairs such as (key :datatype);

const publicationschema=mongoose.Schema(
    {
        
            id:Number,
            name:String,
            books:[String]
        

}

);
const publicationmodel=mongoose.model("publication",publicationschema);

//export module
module.exports=publicationmodel;