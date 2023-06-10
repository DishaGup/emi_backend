
const { connection } = require("./connection")
require('dotenv').config()
const cors = require('cors')

const express = require('express')
const { registerRouter } = require("./Routes/user.routes")
const { auth } = require("./Middleware/hash.middleware")
const { calculateRouter } = require("./Routes/calculate.route")
const app = express()
app.use(express.json())
app.use(cors())

app.use("/user",registerRouter)
app.use("/calculate",auth,calculateRouter)


app.listen(process.env.PORT,async(req,res)=>{
    try {
        await connection
        console.log("mongo DDB connected")
    } catch (error) {
   console.log(error)
console.log("mongo not connected")
    }
    console.log("server running at 8080")
})