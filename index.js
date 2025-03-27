import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors"

const app = express();
app.use(express.json());

// Cors Origin for cross origin

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
    credentials: true,
}))

// DOnation Schema
const donateSchema = mongoose.Schema({
    name: {
        type: String,

    },
    address: {
        type: String,
    },
    phoneNo: {
        type: Number,
    },
    amount: {
        type: Number,
    }
});

// DOnation Model

const donateModel = mongoose.model("donate", donateSchema);

// API's
// donation register APi

app.post('/api/donate', (req, res) => {

    const { name, address, phoneNo, amount } = req.body;

    if (!name || !address || !phoneNo || !amount)
        return res.status(500).json({
            success: false,
            message: "All fields are required."
        });


    const isSuccess = donateModel.create({
        name, address, phoneNo, amount
    });


    if (!isSuccess) return res.status(500).json({
        success: false,
        message: "Internal Server Error."
    });


    res.status(200).json({
        success: true,
        message: "Thank you for donation."

    });


});


// Get Donation Details

app.get('/api/getdetails', async (req, res) => {
    try {

        const data = await donateModel.find();

        if (!data) return res.status(500).json({
            success: false,
            message: "Internal server error."
        });

        res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error,
            message: error.message

        });

    }

});



// Home ROute 
app.use("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is working on Port : 4000"
    });
});


// MongoDb Connection 

mongoose.connect(`mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0`, { "dbName": "donate" }).then((res) => {
    console.log("Database connected.");
}).catch((e) => {
    console.log("Error : ", e);
});



// Backend Server Port
app.listen(4000, (req, res) => {
    console.log("Server working on Port : ", 4000);
});