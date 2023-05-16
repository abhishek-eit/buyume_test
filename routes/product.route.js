const express = require("express");
const Router = express.Router();

const Product = require("../models/product.model");
const mongoose= require("mongoose");

Router.post("/addTestProducts", async (req, res)=> {
    let testData = [
        {
            productName: "A",
            quantity: 10
        },
        {
            productName: "B",
            quantity: 10
        },
        {
            productName: "C",
            quantity: 10
        },
        {
            productName: "D",
            quantity: 10
        },
        {
            productName: "E",
            quantity: 10
        },
    ];
    
    try{
        let x = await Product.insertMany(testData);
        res.status(200).json({status: "success", data: x});
    } catch(err) {
        console.log("error inserting products into db ::: ", err)
    }
});

Router.post("/addOrRemoveInventory", async (req, res)=> {
    console.log("req.body ::; ", req.body);
    let products = req.body;
    try{
        for(product of products){
            console.log(product)
            let x = await Product.findOne({_id: product.productId}).select({quantity: 1}).lean();
            let updateQuantity = x && typeof x.quantity == "number" ? 
                                    product.operation == "add"  
                                        ? x.quantity + product.quantity
                                        : x.quantity - product.quantity
                                    : null
            
            if(typeof updateQuantity == "number"){
                if(updateQuantity < 0){
                    updateQuantity = 0;
                }
                await Product.updateOne({_id: product.productId}, {$set: {quantity: updateQuantity}});
            }

        }
        res.status(200).json({status: "success"});
    } catch(err) {
        console.log("error occured :: ", err);
    }
});

module.exports = Router;