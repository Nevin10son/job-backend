const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const adminModel = require('./models/admin')


let app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://Nevin:nevintensonk@cluster0.0rfrr.mongodb.net/newblogapp?retryWrites=true&w=majority&appName=Cluster0")


app.post("/adminSignUp", (req, res) => {
    let input = req.body
    try {
    let hashedpwd = bcrypt.hashSync(input.password,10)
    input.password = hashedpwd
    adminModel.find().then(
        (response) => {
            if (response.length == 0) {
                let addAdmin = new adminModel(input)
                addAdmin.save().then(() => {
                    res.json({"Status":"Success"})
                }).catch(
                    (saveError) => {
                        console.log("Error saving Admin:",saveError)
                        res.json({"Error":saveError.message})
                    }
                )
                
                
            }
            else {
                res.json({
                    "Status":"Admin already exist"
                })
            }
        }
    ).catch(
        (findError) => {
            console.log("Error finding Admin:",findError)
            res.json({
                "Error":findError
            })
        }
    )
    
}catch(error){
    console.log("General Error:",error)
    res.json({"Status":"General Error","Error":error.message})
}}) 


app.listen("8001", () => {
    console.log("Server Started")
})