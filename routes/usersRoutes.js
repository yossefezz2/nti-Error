const userControlar =require("../app/controlar/users")
var express = require('express');
const router =express.Router()

router.get("/", userControlar.showAll )
router.get("/:", userControlar.single )

router.delete("/:id", userControlar.deleteOne )
router.delete("/", userControlar.deleteAll )

router.put("/:id", userControlar.UpdateOne )

router.post("/res", userControlar.signUp )

router.post("/login", userControlar.login )
module.exports=router