require("../db/Connection")
const path =require("path")
const express =require("express")
const app =express()
const cors =require("cors")
const userTask = require("../routes/usersRoutes")
const Task = require("../routes/taskRouts")


app.use(express.static(path.join(__dirname,"../public")))
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())

app.use("/apiTask",Task)
app.use("/apiUser",userTask)
app.all('*',(req,res)=>{
    res.send({
        massage:"not found"
    })
})

module.exports =app