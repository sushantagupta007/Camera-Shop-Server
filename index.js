const express = require('express');
const app  = express(); 
const port = process.env.PORT ||5000; 

const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;

const ObjectId = require('mongodb').ObjectId;

app.use(cors());
app.use(express.json())

require('dotenv').config()

const uri = "mongodb+srv://sushanta:9MiZ8GJPrnULMVZT@cluster0.jr7lv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
      await client.connect();
      const database = client.db("CameraShop");
      const Products = database.collection("Products");
      const myorder = database.collection("myorder");
      const myreview = database.collection("review");
      const users = database.collection("users"); 

        app.post('/users',async(req,res)=>{
            const registeredUsers = req.body; 
            const addedUser = await users.insertOne(registeredUsers);
            res.json(addedUser)
            console.log(addedUser)
        })

        app.put('/users/admin',async(req,res)=>{
            const user=req.body
            const filter = { email: user.email };

            const options = { upsert: true };
            const updateDoc = {
                $set: {
                  role: 'admin'
                },
              };
            const result = await users.updateOne(filter, updateDoc, options);
            res.json(result)
        })

      //Insert Data
        app.get('/allProducts',async(req,res)=>{
            const productTable = await Products.find({});
            const productArray = await productTable.toArray(); 
            console.log(productArray)
            res.json(productArray)
        })
        app.post('/allProducts',async(req,res)=>{
            const addedProduct = req.body; 
            const updateProduct = await Products.insertOne(addedProduct);
            res.json(updateProduct)
            console.log(updateProduct)
        })

        app.delete('/allProducts',async(req,res)=>{
            const id=req.query.id
            const query = { _id: ObjectId(id) };
            const deltetedData = await Products.deleteOne(query);
            res.json(deltetedData)
            console.log(deltetedData)
        })
       
        app.post('/myorder',async(req,res)=>{
            const myorderData = req.body; 
            const orderTable = await myorder.insertOne(myorderData);
            res.json(orderTable)
            console.log(orderTable)
        })

        app.get('/myorder',async(req,res)=>{
            const email = req.query.email; 
            console.log(email)

            const query = { email: email };
       
            const myorderTable = await myorder.find(query);
            const myorderArray = await myorderTable.toArray(); 
            res.json(myorderArray)
        })
        app.get('/allmyorder',async(req,res)=>{
            const myorderTable = await myorder.find({});
            const myorderArray = await myorderTable.toArray(); 
            res.json(myorderArray)
        })

        app.get('/allmyorder/:id',async(req,res)=>{
            const id = req.params.id; 
            const query = { _id:ObjectId(id) };
            const singleOrderTable = await myorder.findOne(query)
            res.json(singleOrderTable)
            console.log(singleOrderTable);
        })
        app.put('/allmyorder/:id',async(req,res)=>{
            const id = req.params.id;
            const singleOrder = req.body;
            const query = { _id:ObjectId(id) };
            const option ={upsert:true}
            const updated = {
                $set:{status:"shipped"}
            }
            const result = await myorder.updateOne(query, updated);
        })


        app.delete('/myorder',async(req,res)=>{
            const id=req.query.id
            const query = { _id: ObjectId(id) };
            const deltetedData = await myorder.deleteOne(query);
            res.json(deltetedData)
            console.log(deltetedData)
        })

        app.post('/reviews',async(req,res)=>{
            const reviewData = req.body; 
            const reviewTable = await myreview.insertOne(reviewData);
            res.json(reviewTable)
            console.log(reviewTable)
        })
        app.get('/reviews',async(req,res)=>{
            const myreviewTable = await myreview.find({});
            const myreviewArray = await myreviewTable.toArray(); 
            res.json(myreviewArray)
            console.log(myreviewArray)
        })
    } 
    finally {
    //   await client.close();
    }
  }
  run().catch();


app.get('/user',(req,res)=>{
    res.send("Hell I am server")
    console.log("from 5000")
})


app.listen(port,()=>{
    console.log("listening ", port)
})
//sushanta
//0esS1mVJHqMpY2bV