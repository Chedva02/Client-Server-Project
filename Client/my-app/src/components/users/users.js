import  Axios  from "axios"
import { useEffect,useState } from "react"
import {grey } from '@mui/material/colors';
import {green } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import {red } from '@mui/material/colors';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import AddUser from "./AddUser"
import DeleteUser from "./DeleteUser"
import UpdateUser from "./UpdateUser"
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import SortUser from "./SortUser"

const Users=()=>{
  const [users,SetUsers] =useState([])
  const [AddOpen,SetAddOpen] =useState(false)
  const [UpdateOpen,SetUpdateOpen] =useState(false)
  const [value,SetValue] =useState()
  const [Deletevalue,SetDeletevalue] =useState({})
  const [DeleteOpen,SetDeleteOpen] =useState()
  const [inputValue, setInputValue] = useState("");

  const LoudData=async()=>{
   
    try{
    const res=await Axios.get("http://localhost:1500/api/user")
    SetUsers(res.data)
  }catch(e)
  {
    console.error(e)
    SetUsers([])
  }
  
}
const whithValue=()=>{
  SetUsers(users.filter(item=>item.phone.includes(inputValue)))
}
  useEffect(()=>{
    if(inputValue)
      whithValue()
    else{
      LoudData()
    }  
  },[inputValue])
  useEffect(()=>{
    LoudData()
  },[])
  const AddNewUser=()=>{
    SetAddOpen(true)
  }
  const NewUpdateUser=(value)=>{
    SetValue(value)
    SetUpdateOpen(true)
  }
  const DeleteThisUser=async(value)=>{
    SetDeletevalue(value)
    SetDeleteOpen(true)
   
  }
  const DeleteClose=()=>{
    SetDeleteOpen(false);
  }


  return <>
  <div className="list">
    <h3>Users</h3>
    <SortUser data={users} SetData={SetUsers}/>
     <TextField onChange={(e) => {setInputValue(e.target.value) }}   id="outlined-basic" label="Search by phone number" variant="outlined" />
  <List  sx={{ width: '400%', maxWidth: 400, bgcolor: 'background.paper' }}>
  {users.map((value) => (
  
  <ListItem
  
    key={value._id}
    disableGutters
   
  >
         
     <ListItemText primary={value.name} 
     secondary={<React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'text.primary', display: 'inline' }}
              >
                {value.username} 
              </Typography>
              {`- email : ${value.email} , address : ${value.address } , phone : ${value.phone}`}
            </React.Fragment>} />
    <IconButton onClick={() => DeleteThisUser(value)} sx={{ color: red[500] }} aria-label="add an alarm" >
      <AutoDeleteIcon />
    </IconButton>
    <IconButton onClick={() => NewUpdateUser(value._id)} sx={{ color: grey[500] }} aria-label="add an alarm" >
      <CreateIcon />
    </IconButton>
   
  </ListItem>
 ))}
</List>
</div>



<IconButton onClick={() => AddNewUser()} sx={{ color: green[500] }} aria-label="add an alarm" >
<AddIcon className="add"/>
</IconButton>
<AddUser open={AddOpen} setOpen={SetAddOpen} users={users} SetUsers={SetUsers}/>
<UpdateUser open={UpdateOpen} setOpen={SetUpdateOpen} value={value} users={users} SetUsers={SetUsers}/>
<DeleteUser open={DeleteOpen} setopen={SetDeleteOpen} users={users} SetUsers={SetUsers} onClose={DeleteClose} payload={Deletevalue} />
</>
}
   



export default Users