const Books=[{
    isbn:"12345",
    title:"5amclub",
    pubdate:"2023-03-01",
    language:"en",
    numpage:250,
    author:[1,2],
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
    }
]
module.exports={Books,author,publication};
