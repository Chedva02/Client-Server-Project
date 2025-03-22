import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import {useState } from "react"
import Axios from "axios"
 const UpdateUser=({open, setOpen, value, users,SetUsers})=>{

const [name,setName]=useState("")
const [username,setUsername]=useState("")
const [email,setEmail]=useState("")
const [address,setAddress]=useState("")
const [phone,setPhone]=useState("")

const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const Save = async() => {
    if(!name||!username||!email||!phone){
      setOpen(true)
        return;}
    setOpen(false);
    
   
    const user={
      name:name,
      username:username,
      email:email,
      address:address,
      phone:phone
  }
  try{
    const res=await Axios.put(`http://localhost:1500/api/user/${value}`,user)
    SetUsers(users.map(item=>
      item._id===value ?{...item,name:user.name,username:user.username,email:user.email,address:user.address,phone:user.phone}:item
   ))
   }
   catch(e){
   console.log(e)
 
  }
 



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
    <DialogTitle>UpdateUser</DialogTitle>
    <DialogContent>
         <TextField 
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="String"
            fullWidth
            variant="standard"
            trim="true"
            onChange={(e)=>{setName(e.target.value)}}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="userName"
            name="userName"
            label="UserName"
            type="String"
            fullWidth
            variant="standard"
            onChange={(e)=>{setUsername(e.target.value)}}
           
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="String"
            fullWidth
            variant="standard"
            onChange={(e)=>{setEmail(e.target.value)}}
           
           
          />
          <TextField
            
            margin="dense"
            id="address"
            name="address"
            label="Address"
            type="String"
            fullWidth
            variant="standard"
            onChange={(e)=>{setAddress(e.target.value)}}
           
           
          />
          <TextField
           
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Phone"
            type="String"
            fullWidth
            variant="standard"
            onChange={(e)=>{setPhone(e.target.value)}}
           
           
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
 export default UpdateUser