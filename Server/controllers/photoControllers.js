const Photos= require("../models/Photo")
const createPhoto=async(req,res)=>{
   const {title,imageUrl}=req.body
   if(!title||!imageUrl)
    return res.status(404).json({messege:'title and imageUrl are required'})
   const photo=await Photos.create({title,imageUrl})
   if(photo)
    return res.status(200).json(photo)
  return res.status(404).json({messege:'failed to add the photo'})
}
const getAllPhotos =async(req,res)=>{
    const photos=await Photos.find().lean()
    if(!photos?.length)
        return res.status(400).json({ message: 'No photos found' })
    res.json(photos)
}
const getPhotoById =async(req,res)=>{
    const{id}=req.params
    const photo=await Photos.findById(id).lean()
    if(!photo)
        return res.status(404).json({messege:'this photo not found'})
    res.json(photo)
}
const updatePhoto=async(req,res)=>{
    const{id}=req.params
    const{title,imageUrl}=req.body
    if(!title||!imageUrl)
        return res.status(404).json({messege:'title and imageUrl are required'})
    const photo=await Photos.findById(id).exec()
    if(!photo)
        return res.status(404).json({messege:'this photo not found'})
    photo.title=title
    photo.imageUrl=imageUrl
    const savephoto=await photo.save()
    return res.status(200).json(savephoto)

}
const deletePhoto=async(req,res)=>{
    const{id}=req.params
    const photo=await Photos.findById(id).exec()
    if(!photo)
        return res.status(404).json({messege:'this photo not found'})
    const photodelete=await photo.deleteOne()
    res.json(`${photo.title} delete`)
}
module.exports={createPhoto,getAllPhotos,getPhotoById,updatePhoto,deletePhoto}