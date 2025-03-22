const express=require("express")
const userController=require("../controllers/userControllers")
const router=express.Router()
router.get("/",userController.getAllUser)
router.get("/:id",userController.getUserById)
router.get("/Phone/:Phone",userController.getUserByPhon)
router.post("/",userController.creatNewUser)
router.delete("/:id",userController.deleteUser)
router.put("/:id",userController.updateUser)

module.exports = router
