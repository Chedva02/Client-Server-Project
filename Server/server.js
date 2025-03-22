
require("dotenv").config()
const mongoose = require('mongoose')
const express=require('express')
const app=express()
const PORT =process.env.PORT||2000
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const connectDB = require("./config/dbConn")
connectDB()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use("/api/user", require("./routers/userRouters"))
app.use("/api/post", require("./routers/postRouters"))
app.use("/api/todo", require("./routers/todoRouters"))
app.use("/api/photo",require("./routers/photoRouters"))

app.get("/",(req,res)=>{
    res.send("Home Page")
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port
    ${PORT}`))
})
mongoose.connection.on('error', err => {
console.log(err)
})