//const { json } = require("express");
const express=require("express");
//body parser
var bodyparser=require('body-parser');

//database
const database=require("./books");
const { urlencoded } = require("express");


const api=express();
api.use(bodyparser .urlencoded({extended:true}));
api.use(bodyparser.json());
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
   api.get("/author",(req,res)=>
   {
    return res.json({authors:database.author})
   })
   //API HTTP REQUEST
   //POST REQUEST ;
   api.post("/book/new",(req,res)=>{
    const newbook=req.body;
    database.Books.push(newbook);
    return res.json({updatedbook:database.Books});
   }
   );

   api.post("/author/new",(req,res)=>{
    const authors=req.body;
    database.author.push(authors);
    return res.json({author:database.author});
   });


   // put request

   api.put("/publication/update/books/:ISBN",(req,res)=>
   {
    database.publication.forEach((pub)=>{
        if(pub.id===req.body.pubID){
            return pub.books.push(req.params.ISBN);

        }
        
    });
    database.Books.forEach((book)=>{
        if(book.isbn===req.params.ISBN)
        {
            book.publications=req.body.pubID;
            return;
        }
    });
    return res.json({
        books:database.Books,
        publication:database.publication,
    })

   });