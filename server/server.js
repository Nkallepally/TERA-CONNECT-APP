const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors=require("cors")
const app = express();
const PORT = process.env.PORT || 3002;
const productivityController = require("./routes/productivity")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/user", productivityController);

mongoose.connect("mongodb://localhost:27017/tera-connects-app", () => {
    console.log("Succesfully connected to db")
}, (err) => {
    console.log(err)
})

app.get("/", (req, res) => {
    res.status(200).send("Productivity App")
}, (err) => {
    console.log(err)

})

app.listen(PORT, (req, res) => {
    console.log(`Server got connected at ${PORT}`)
});
