import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import {useState } from "react"
import Axios from "axios"
import Photos from './photos';
 const UpdatePhotosForm=({open, setOpen,value,SetPhotos,photos})=>{

const [title,setTitle]=useState("" )
const [imageUrl,setImageUrl]=useState("")

const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const Save = async() => {
    if(!title||!imageUrl){
      setOpen(true)
        return;}
    setOpen(false);
    const photo={
        title:title,
        imageUrl:imageUrl
    }
    const string=`http://localhost:1500/api/photo/${value}`
  try{
   const res=await Axios.put(string,photo)
   SetPhotos(photos.map(item=>item._id===value?{...item,title:title,imageUrl:imageUrl}:item))
  }
  catch(e){
  console.log(e)
}
setTitle("")
setImageUrl("")



  };
  
  return(
    <>
    <React.Fragment>
  <Dialog
  open={open}
  onClose={handleClose}
  slotProps={{
    paper: {
      component: 'form',
      onSubmit: (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
       
        handleClose();
      },
    },
  }}>
    <DialogTitle>Update Post</DialogTitle>
    <DialogContent>
         <TextField 
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            type="String"
            fullWidth
            variant="standard"
            trim="true"
            onChange={(e)=>{setTitle(e.target.value)}}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="url"
            name="imageUrl"
            label="ImageUrl"
            type="String"
            fullWidth
            variant="standard"
            onChange={(e)=>{setImageUrl(e.target.value)}}
           
          />
          
          <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={Save}>Save</Button>
        </DialogActions>
    </DialogContent>

  </Dialog>
  </React.Fragment>
    </>
  )
 }
 export default UpdatePhotosForm