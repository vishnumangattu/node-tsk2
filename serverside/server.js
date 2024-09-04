const PORT=3005;
const http=require("http");
const fs=require("fs");
const url=require("url");
const { log, error } = require("console");
const queryString=require("querystring");
const {MongoClient}=require("mongodb");
const client=new MongoClient("mongodb://127.0.0.1:27017/");
const app=http.createServer(async(req,res)=>{
    const db=client.db("bloodbank");
    const collection=db.collection("donor");
    const path=url.parse(req.url);
    console.log(path);
    if (path.pathname=="/")
    {
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../clientside/pages/index.html"));
    }
    else if (path.pathname=="/css/style.css")
        {
            res.writeHead(200,{"Content-Type":"text/css"});
            res.end(fs.readFileSync("../clientside/css/style.css"));
        }
    else if (path.pathname=="/js/custom.js")
         {
                res.writeHead(200,{"Content-Type":"text/js"});
                res.end(fs.readFileSync("../clientside/js/custom.js"));
        }
    else if (path.pathname=="/add")
            {
                   res.writeHead(200,{"Content-Type":"text/html"});
                   res.end(fs.readFileSync("../clientside/pages/add.html"));
           }
           else if (path.pathname=="/css/add.css")
            {
                res.writeHead(200,{"Content-Type":"text/css"});
                res.end(fs.readFileSync("../clientside/css/add.css"));
            }
            console.log(req.method);
            
if (req.method =="POST" && path.pathname=="/submit")
        {
               let body="";
               req.on("data",(chunks)=>{
                console.log(chunks);
                body+=chunks.toString();
                console.log(body);
               });
            req.on("end",async()=>{
                if(body!=null)
                {
                    const formData=queryString.parse(body);
                    console.log(formData);
                    collection.insertOne(formData).then(() => {
                        console.log("success");
                      }).catch((error) => {
                        console.log(error);
                      });
                }
            });
            res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../clientside/pages/index.html"));
        }
      if(path.pathname=="/getdonors"&& req.method=="GET")
        {
            const data=await collection.find().toArray();
            const maindata=JSON.stringify(data);
            res.writeHead(200,{"Content-Type":"text/json"});
        res.end(maindata);
            
        }  
});
client.connect().then(()=>{
    console.log("database connected");
    app.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`);
        
    });
}).catch((error)=>{console.log(error);
})
