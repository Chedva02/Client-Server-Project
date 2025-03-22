const Post=require("../models/Post")

const creatNewPost=async(req,res)=>{
   const{title,body}=req.body
   if(!title)
     return res.status(404).json({messege:'title is required!'})
   const newPost= await Post.create({title,body})
   if(newPost)
    return res.status(200).json(newPost)
   return res.status(400).json({messege:'falied to add the Post'})

}
const getAllPost =async(req,res)=>{
    const posts=await Post.find().lean()
    if(!posts?.length)
        return res.status(400).json({ message: 'No posts found' })
    res.json(posts)
}
const getPostsById =async(req,res)=>{
    const{id}=req.params
    const post=await Post.findById(id).lean()
    if(!post)
        return res.status(404).json({messege:'this post not found'})
    res.json(post)
}
const getPostByText=async(req,res)=>{
    const {Text}=req.params
    const posts = await Post.find({ body: { $regex: Text, $options: "i" } });
  
    if(!posts)
        return res.status(404).json({messege:'Posts not found!'})

    res.json(posts)
}  
const updatePost=async(req,res)=>{
    const{id}=req.params
    const{title,body}=req.body
    if(!title)
      return res.status(404).json({messege:'title is required!'})
    const post=await Post.findById(id).exec()
    if(!post)
        return res.status(404).json({messege:'this post not found'})
    post.title=title
    post.body=body
    const update=await post.save()
    res.json(`${update.title} updated`)

}
const deletePost=async(req,res)=>{
    const{id}=req.params
    const post=await Post.findById(id).exec()
    if(!post)
        return res.status(404).json({messege:'this post not found'})
    const postdelete=await post.deleteOne()
    res.json(`${post.title} delete`)
}
module.exports={creatNewPost,getAllPost,getPostsById,updatePost,deletePost,getPostByText}