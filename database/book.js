const mongoose=require("mongoose");
//BOOK SCHEMA
//schema is a blueprint of how data has to be constructed
//schema contains key value pairs such as (key :datatype);

const bookschema=mongoose.Schema(
    {
    isbn: String,
    title:String,
    pubdate:String,
    language:String,
    numpage:Number,
    author:[Number],
    publications:[Number],
    category:[String]

}

);
const bookmodel=mongoose.model("Books",bookschema);

//export module
module.exports=bookmodel;