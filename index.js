const express = require('express');
const app = express();
require("dotenv").config();

const mongoose = require("mongoose");
const cors = require('cors');

const productRoutes = require("./routes/product.route");

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);


const runServer = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected");
        app.listen(process.env.PORT || 3030)
        console.log("app started on port ", process.env.PORT || 3030)
    } catch (err){
        console.log("error starting the app :: ", err);
    }
}

runServer();
