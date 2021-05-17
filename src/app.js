const express= require("express");
const app= express();
const path =require("path");
const hbs =require("hbs");
const port= process.env.Port || 3000;
require("./db/conn.js");
const Register=require("./models/contact");
const template =path.join(__dirname,"../templates/views")
const partial =path.join(__dirname,"../templates/partials")
const staticpath=path.join(__dirname , '../public');
app.use(express.static(staticpath))
app.use(express.urlencoded({extended:false}));
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")))
app.use('/js', express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")))
app.use('/jq', express.static(path.join(__dirname,"../node_modules/jquery/dist")))
app.set("view engine","hbs")
app.set("views",template)
hbs.registerPartials(partial)
app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/contact",(req,res)=>{
    res.render("contact")
})

app.post("/",async(req,res)=>{
    try{
        const registerUser= new Register({
            name:req.body.name,
            email:req.body.Email,
            contact:req.body.phno,
            message:req.body.message
        })
        registerUser.save(function(err,doc){
            if(err)
            res.json(err);
            else
            res.render("index")
        });
      
    }catch(error){
        res.status(400).send(error);
    }
})

app.listen(port,()=>{

    console.log(`server is running at port no ${port}`)
})  