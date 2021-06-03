import express from 'express';
import { getClient } from '../db';
import { ObjectId } from 'mongodb';
import CartItem from '../model/CartItem'

const route = express.Router();
route.get("/", async (req, res) => {
  try {
    let maxPrice= parseInt(req.query.maxPrice as string);
    let productName = String(req.query.name || "");
    let pageSize=parseInt(req.query.pageSize as string);
    const client = await getClient();
    const results = await client.db().collection<CartItem>('cartItems').find().toArray();
    let result = results
    // if(maxPrice){
    //   result=result.filter(food=>food.price<=maxPrice)
    //   res.json(result)
    // }
    // if(productName){
    //   result = result.filter(food => food.product === productName);
    //   res.json(result)
    // }
    // if(pageSize){
    //   for (let i=0; i<result.length; i++){
    //     if(Number(result[i])!<=pageSize){
    //       res.json(result);
    //     } else{ 
          
    //       break;
    //     }
    //   }
    // // result =result.filter(food => Number(food.id) <=pageSize)
    // }
    
    
    
      res.json(result);
 
  } catch (err) {
    console.error("FAIL", err);
    res.status(500).json({message: "Internal Server Error"});
  }
});

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const results = await client.db().collection<CartItem>('cartItems').findOne({ _id : new ObjectId(id) });
    if (results) {
      res.json(results);
    } else {
      res.status(404).json({message: "Not Found"});
    }
  } catch (err) {
    console.error("FAIL", err);
    res.status(500).json({message: "Internal Server Error"});
  }
});

route.post("/", async (req, res) => {
  const item = req.body
  try {
    const client = await getClient();
    const result = await client.db().collection('cartItems').insertOne(item);
    item._id = result.insertedId;
    res.status(201).json(item);
}
catch (err) {
    console.error("FAIL", err);
    res.status(500).json({ message: "Internal Server Error" });
}
});

route.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const results = await client.db().collection<CartItem>('cartItems').findOne({ _id : new ObjectId(id) });
    if (results) {
      res.json(results);
    } else {
      res.status(404).json({message: "Not Found"});
    }
  } catch (err) {
    console.error("FAIL", err);
    res.status(500).json({message: "Internal Server Error"});
  }
});







export default route;