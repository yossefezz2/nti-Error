const taskControlar =require("../app/controlar/tasks")
var express = require('express');
const router =express.Router()

// router.get("/", taskControlar.test )
router.post("/addTask",taskControlar.addTask)
module.exports=router