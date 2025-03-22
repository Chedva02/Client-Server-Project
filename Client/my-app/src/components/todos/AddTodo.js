import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import {useState } from "react"
import Axios from "axios"
 const AddTodo=({open, setOpen,todos,setTodos})=>{

const [title,setTitle]=useState("")
const [tag,setTag]=useState(" ")
const [Completed,setCompleted]=useState(false)

const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const Save = async() => {
    if(!title){
      setOpen(true)
        return;}
    setOpen(false);
    if(!tag){
      const todo={
        title:title,
        tags:tag,
        Completed:Completed
    }
    try{
      const res=await Axios.post("http://localhost:1500/api/todo",todo)
      setTodos([...todos, res.data])
      console.log(todos)
     }
     catch(e){
     console.log(e)
     
   }
    }
      
    else{
      console.log(tag)
    const tags=tag.split(" ")
    const todo={
      title:title,
      tags:tags,
      completed:Completed
  }
  try{
    const res=await Axios.post("http://localhost:1500/api/todo",todo)
    setTodos([...todos, res.data])
    console.log(todos)
   }
   catch(e){
   console.log(e)
 }
  }
 
setTitle("")};
  
  
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
    <DialogTitle>AddTodo</DialogTitle>
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
            margin="dense"
            id="tag"
            name="tags"
            label="Tags"
            type="String"
            fullWidth
            variant="standard"
            onChange={(e)=>{setTag(e.target.value)}}
           
          />
          <TextField
            autoFocus
            margin="dense"
            id="Complete"
            name="Completeds"
            label="Completed?"
            type="boolean"
            fullWidth
            variant="standard"
            onChange={(e)=>{setCompleted(e.target.value)}}
           
           
          />
          <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={Save}>Save</Button>
        </DialogActions>
    </DialogContent>

  </Dialog>
  </React.Fragment></>
   )}
  export default AddTodo
 
 