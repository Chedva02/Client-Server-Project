
const Todo=require("../models/Todo")
const createTodo=async (req,res)=>{
   const{title,tags,completed}=req.body
   if(!title)
      return res.status(404).json({messege:'title is requierd!'})
   const todo=await Todo.create({title,tags,completed})
   if(todo)
      return res.status(200).json(todo)
   return res.status(400).json({messege:'falied to add todo!'})
}
const updateTodo=async (req,res)=>{
    const{id}=req.params
    const{title,tags,completed}=req.body
    const todo= await Todo.findById(id).exec()
    if(!todo)
        return res.status(404).json({messege:'Todo not found!'})
    if(!title)
        return res.status(400).json({messege:'title is requierd!'})
    todo.title=title
    todo.tags=tags
    todo.completed=completed
    const newTodo=await todo.save()    
    res.json(`${newTodo.title} whith ${id} updated`)
    }
const updateCompleted=async (req,res)=>{
      const{id}=req.params
        const{completed}=req.body
        const todo= await Todo.findById(id).exec()
        if(!todo)
            return res.status(404).json({messege:'Todo not found!'})
           
        todo.completed=completed
        const newTodo=await todo.save()    
        res.json(`${newTodo.title} whith ${id} Completed`)
}
const getAllTodos=async(req,res)=>{
    const Todos=await Todo.find().lean()
    if(!Todos?.length)
        return res.status(400).json({messege:'doesnt find Todos'})
    res.json(Todos)
}   
const getTodoById=async(req,res)=>{
    const {id}=req.params
    const todo=await Todo.findById(id).lean()
    if(!todo)
        return res.status(404).json({messege:'Todo not found!'})

    res.json(todo)
}  
const getTodoByTags=async(req,res)=>{
    const {Category}=req.params
    const todos=await Todo.find({tags:{$in: [Category]}})
  
    if(!todos)
        return res.status(404).json({messege:'Todos not found!'})

    res.json(todos)
}  
const deleteTodoById=async(req,res)=>{
    const {id}=req.params
    const todo=await Todo.findById(id).exec()
    if(!todo)
        return res.status(404).json({messege:'Todo not found!'})
    const deleteTodo=await todo.deleteOne()
    res.json(`${todo.title} deleted`)}
  

module.exports={createTodo,updateTodo,getAllTodos,getTodoById,deleteTodoById,updateCompleted,getTodoByTags}
