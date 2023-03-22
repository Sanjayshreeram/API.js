 //ENV
 require("dotenv").config();
//const { json } = require("express");
const express=require("express");
//env
//require("dotenv").config();
//mongoose
const mongoose=require("mongoose");
//body parser
var bodyparser=require('body-parser');


//database
const database=require("./database/books");
//models

const Bookmodel=require("./database/book");
const Authormodel=require("./database/author");
const Publicationmodel=require("./database/publication");
const { urlencoded } = require("express");
const authormodel = require("./database/author");

//connect to database
mongoose.connect(process.env.url_db).then(()=>console.log("connection done"));


const api=express();
api.use(bodyparser .urlencoded({extended:true}));
api.use(bodyparser.json());
/*
route
description get all the books
access public
parameter none
methods get*/

api.get("/", async (req,res)=>
{
   const getallbooks=await Bookmodel.find();
   return res.json(getallbooks);
});
api.listen(3000,()=>

{
    console.log("api running in the background");
});
api.get("/is/:ISBN", async (req,res)=>
 {const getspecificbook=await Bookmodel.findOne({isbn:req.params.ISBN});
   
if(getspecificbook){
    return res.json({error:`no book found at isbn ${req.params.ISBN}`});
}
return res.json({book:getspecificbook})

});
/* category of specific  book */


api.get("/c/:Category",async (req,res)=>
{
 const getspecificbook= await Bookmodel.findOne({category:req.params.Category});
 
  if(!getspecificbook){
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
   api.get("/author", async(req,res)=>
   {
    const getallauthor=await Authormodel.find();
    return res.json(getallauthor)
   })
   //API HTTP REQUEST
   //POST REQUEST ;
   api.post("/book/new", async (req,res)=>{
    //pass req through postman
    //restructuring to object format for using in mongoose;

    const {newbook}=  req.body;
    const addnewbook=Bookmodel.create(newbook);

    return res.json({updatedbook:addnewbook,
    message:"book added"});
   }
   );

   api.post("/author/new", async (req,res)=>{
    const {authors}=req.body;

    const newauthor=Authormodel.create(authors);

    return res.json({author:newauthor,
    message:"new author added"});
   });


//update book on isbn
api.put("/book/update/:ISBN", async(req,res)=>
{
    const newupdatedbook= await Bookmodel.findOneAndUpdate(
        {
            isbn:req.params.ISBN,
        },
        {
            title:req.body.booktitle
            

        },
        {
            // used toupdate to both backend and frontend
            new:true
        }

    );
    return res.json({
        books:newupdatedbook
    });
})
api.put("/book/author/update/:ISBN" , async (req,res)=>
{
    const updatedbook=await Bookmodel.findOneAndUpdate({
        isbn:req.params.ISBN
    },
    {  
        $addToSet :{ 
        author:req.body.newauthor
    }
    },
    {
        new:true
    }
    );
    const updatedauthor=await Authormodel.findOneAndUpdate({
        id:req.body.newauthor
    },
      { $addToSet:{
        books:req.params.ISBN
    }
},
   {
    new:true
   });
 return res.json({
    //updateauthor:updatedauthor,
    updatedbook:updatedbook,
    updateauthor:updatedauthor,
    message:"updated"
   });

});

   //get all publication'
   api.get("/publications",async (req,res)=>
   {
    const getallpublication=await Publicationmodel.find();
    return res.json(getallpublication);
   })


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
   //delete the book
   api.delete("/book/delete/:ISBN", async(req,res)=>
   {
    const updatedbookdatabase= await Bookmodel.findOneAndDelete(
        {
            isbn:req.params.ISBN
        }
    )
    return res.json({books:updatedbookdatabase});
   })
   //delete the author
  
   api.delete("/book/delete/author/:ISBN/:authorid",(req,res)=>{
    database.Books.forEach((book)=>{
        if(book.isbn===req.params.ISBN){
            const newlist=book.author.filter((each)=>each!==parseInt(req.params.authorid));
            book.author=newlist;
            return;
            
        }
    });
    //update author database
    database.author.forEach((each)=>{
        if(each.id===parseInt(req.params.authorid))
        {
            const newlist=each.books.filter((book)=>book!==req.params.ISBN);
            each.books=newlist;
            return;
        }
    });
    return res.json({
        book:database.Books,
        author:database.author
    })
   })  