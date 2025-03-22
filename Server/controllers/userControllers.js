const User=require("../models/user")

const creatNewUser=async(req,res)=>{
   const{name,username,email,address,phone}=req.body
   if(!name||!username||!email||!phone||phone.length<9)
     return res.status(404).json({messege:'name, username,email and phone must to be!'})
    const find =await User.findOne({name:name}).lean()
    if(find){
        
        return res.status(404).json({messege:'we have this user'})}
   const newUser= await User.create({name,username,email,address,phone})
   if(newUser)
    return res.status(200).json(newUser)
   return res.status(400).json({messege:'falied to add the user'})

}
const getAllUser =async(req,res)=>{
    const users=await User.find().lean()
    if(!users?.length)
        return res.status(400).json({ message: 'No users found' })
    res.json(users)
}
const getUserById =async(req,res)=>{
    const{id}=req.params
    const user=await User.findById(id).lean()
    if(!user)
        return res.status(404).json({messege:'this user not found'})
    res.json(user)
}
const getUserByPhon =async(req,res)=>{
    const{Phone}=req.params
    const user=await User.find({phone:{ $regex: Phone, $options: "i" }})
    if(!user)
        return res.status(404).json({messege:'users not found'})
    res.json(user)
}
const updateUser=async(req,res)=>{
    const{id}=req.params
    const{name,username,email,address,phone}=req.body
    if(!name||!username||!email||!phone)
      return res.status(404).json({messege:'name, username,email and phone must to be!'})
    const user=await User.findById(id).exec()
    if(!user)
        return res.status(404).json({messege:'this user not found'})
    const sameName=await User.findOne({name:name ,_id:{$ne:id}}).exec()
    if(sameName)
        return res.status(404).json({messege:'Can`t add this user'})
    user.name=name
    user.username=username
    user.email=email
    user.address=address
    user.phone=phone
    const update=await user.save()
    res.json(user)

}
const deleteUser=async(req,res)=>{
    const{id}=req.params
    const user=await User.findById(id).exec()
    if(!user)
        return res.status(404).json({messege:'this user not found'})
    const userdelete=await user.deleteOne()
    res.json(`${user.name} delete`)
}
module.exports={creatNewUser,getUserById,updateUser,deleteUser,getAllUser,getUserByPhon}