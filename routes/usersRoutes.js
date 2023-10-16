const userControlar =require("../app/controlar/users")
const userMiddleware = require("../app/middelware/auth.middelware")
var express = require('express');
const router =express.Router()

router.get("/", userControlar.showAll )
router.get("/:", userControlar.single )

router.get("/showAllAdresse", userMiddleware, userControlar.showAllAdresse )
router.delete("/deleteAddress/:idAddress", userMiddleware, userControlar.deleteAddress )

router.delete("/:id", userControlar.deleteOne )
router.delete("/", userControlar.deleteAll )

router.put("/:id", userControlar.UpdateOne )

router.post("/res", userControlar.signUp )

router.post("/login", userControlar.login )

router.post("/logout",userMiddleware,  userControlar.logout )
router.post("/change",userMiddleware,  userControlar.changePassword )
router.post("/logoutAll",userMiddleware,  userControlar.logoutAll )
module.exports=router