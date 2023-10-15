require("dotenv").config()
const app =require("./app/app.js")

app.listen(process.env.PORT,()=>{console.log("task")})