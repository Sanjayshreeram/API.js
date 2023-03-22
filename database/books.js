const Books=[{
    isbn:"12345",
    title:"5amclub",
    pubdate:"2023-03-01",
    language:"en",
    numpage:250,
    authors:[1],
    publications:[1],
    category:["self development","motivation","discipline"]

}]
const author=[{
    id:1,
    name:"robin ",
    books:["12345","secretbook"]
},
{
    id:2,
    name:"sharma",
    books:["12345"]
}]
const publication=[
    {
        id:1,
        name:"jiaco",
        books:["12345"]
    },
    //TO UPDATE USING PUT 
    {
        id:2,
        name:"NEW",
        books:["12345"]
    }
]
//EXPORTING THE DATABASE
module.exports={Books,author,publication};
