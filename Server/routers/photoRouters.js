const express=require("express")
const router=express.Router()
const photoControllers=require("../controllers/photoControllers")

router.get("/",photoControllers.getAllPhotos)
router.get("/:id",photoControllers.getPhotoById)
router.post("/",photoControllers.createPhoto)
router.put("/:id",photoControllers.updatePhoto)
router.delete("/:id",photoControllers.deletePhoto)
module.exports=router