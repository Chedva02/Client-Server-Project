const express=require("express")
const router=express.Router()
const postControllers=require("../controllers/postControllers")

router.get("/",postControllers.getAllPost)
router.get("/:id",postControllers.getPostsById)
router.get("/Text/:Text",postControllers.getPostByText)
router.post("/",postControllers.creatNewPost)
router.put("/:id",postControllers.updatePost)
router.delete("/:id",postControllers.deletePost)

module.exports=router
