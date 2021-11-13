const express = require('express');
const MongoClient = require("mongodb").MongoClient;
const app = express(); 
const port = process.env.PORT ||5000; 

//MiddleWar
require('dotenv').config()
const cors = require('cors'); 
app.use(cors());
app.use(express.json())


app.get('/user',(req,res)=>{
    res.send("hello")
})


//Database
const uri = "mongodb+srv://sushanta:9MiZ8GJPrnULMVZT@cluster0.jr7lv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("CameraShop");
      const products = database.collection("Products");

    app.get('/products',async(req,res)=>{
        const productTable = await products.findOne({});
        const productArray = await productTable.toArray(); 
        res.json(productArray); 
        console.log(productArray)
    })
      
      // since this method returns the matched document, not a cursor, print it directly
      
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);



app.listen(port,()=>{
    console.log("listening",port)
})