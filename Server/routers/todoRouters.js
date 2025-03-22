const express=require("express")
const router=express.Router()
const todoControllers=require("../controllers/todoControllers")

router.get("/",todoControllers.getAllTodos)
router.get("/:id",todoControllers.getTodoById)
router.get("/Category/:Category",todoControllers.getTodoByTags)
router.delete("/:id",todoControllers.deleteTodoById)
router.post("/",todoControllers.createTodo)
router.put("/:id",todoControllers.updateTodo)
router.put("/Completed/:id",todoControllers.updateCompleted)


module.exports=router
