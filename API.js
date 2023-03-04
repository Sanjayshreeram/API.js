const { json } = require("express");
const express=require("express");
//database
const database=require("./books");


const api=express();
/*
route
description get all the books
access public
parameter none
methods get*/

api.get("/",(req,res)=>
{
return res.json({books:database.Books})
});
api.listen(3000,()=>

{
    console.log("api running in the background");
});
api.get("/is/:ISBN",(req,res)=>
 {const getspecificbook=database.Books.filter((book)=>
    book.isbn=== (req.params.ISBN)
);
if(getspecificbook.length===0){
    return res.json({error:`no book found at isbn ${req.params.ISBN}`});
}
return res.json({book:getspecificbook})

});
/* category of specific  book */


api.get("/c/:Category",(req,res)=>
{
 const getspecificbook=database.Books.filter((book)=>
book.category.includes(req.params.Category)
    )
  if(getspecificbook.length===0){
   return res.json({error:`no book found at ${req.params.Category}`})
  }

   return res.json({book:getspecificbook}) });
   //get book of an specific language.


   api.get("/la/:Language",(req,res)=>{
   const getspecificbook=database.Books.filter((book)=> 
   book.language===(req.params.Language))
   if(getspecificbook.length===0)
{
    return res.json({error:`no book found for language ${req.params.Language}`}
    )}
    return res.json({book:getspecificbook});
}
   )