import Axios from "axios"
import { useEffect,useState,useRef } from "react"
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import List from '@mui/material/List';
import {red } from '@mui/material/colors';
import {grey } from '@mui/material/colors';
import {green } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import TodosForm from "../todos/TodosForm";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AddTodo from "../todos/AddTodo";
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import TodosCategory from "../todos/todosCategory"
import DeleteTodo from "./DeleteTodo"
import RowRadioButtonsGroup from "../todos/SortList"


const Todos=()=>{
const [todos,setTodos]=useState([])
const [open, setOpen] = useState(false);
const [Addopen, setAddopen] = useState(false);
const [value, setValue] = useState({})
const [Inputvalue, setInput] = useState("");
const [Deletevalue,SetDeletevalue] =useState({})
const [DeleteOpen,SetDeleteOpen] =useState()



useEffect(()=>{
  if(Inputvalue)
      withInput()
  else{
    loadData()
    }
},[Inputvalue])
useEffect(()=>{
  loadData()
},[])


const loadData= async()=>{
 
  try{

    const res=await Axios.get("http://localhost:1500/api/todo")
    setTodos(res.data)
    
  }
  catch(e){
   console.log(e)
   setTodos([])
  }

}
const withInput=()=>{
  setTodos(todos.filter(item=> item.tags.includes(Inputvalue)))
 
 }
    
const deleteTodo= (value)=>{

  SetDeletevalue(value)
  SetDeleteOpen(true)
}
const DeleteClose=()=>{
  SetDeleteOpen(false)
}


const updateTodo= (val)=>{
  setOpen(true)
  setValue(val)
  
  
}
const AddNewTodo=()=>{
  setAddopen(true)
}
const ChangeCommpleted=async(value)=>{
  const Objcompleted={
    completed: !value.completed
  }
  const bool=value.completed;
  
 try{
  const res=await Axios.put(`http://localhost:1500/api/todo/Completed/${value._id}`,Objcompleted)
 
}
catch(e){
  console.log(e)
}

setTodos(todos.map(item => 
  item._id === value._id ? { ...item, completed:!value.completed } : item))
}




return <>  
<div className="list">
  <h3>Todos</h3>
  <RowRadioButtonsGroup data={todos} SetData={setTodos}  />
<TodosCategory className="Category" setInput={setInput}/>
    <List  sx={{ width: '400%', maxWidth: 400, bgcolor: 'background.paper' }}
   /* subheader={
      <ListSubheader component="div" id="nested-list-subheader" >
        Todos
      </ListSubheader>
    }*/ >
  {todos.map((value) => (
    
    <ListItem
    
      key={value._id}
      disableGutters
     
    >
    
      <ListItemText primary={value.title} secondary={value.tags.map((e)=>e+" ")} />
      <IconButton onClick={() => deleteTodo(value)} sx={{ color: red[500] }} aria-label="add an alarm" >
        <AutoDeleteIcon />
      </IconButton>
      <IconButton onClick={() => updateTodo(value)} sx={{ color: grey[500] }} aria-label="add an alarm" >
        <CreateIcon />
      </IconButton>
     
      {(value.completed===true) ? <IconButton onClick={() => ChangeCommpleted(value)} sx={{ color: green[500] }} aria-label="add an alarm" >
        <p>Completed</p>
        <DoneAllIcon />
      </IconButton> : <IconButton onClick={() => ChangeCommpleted(value)} sx={{ color: grey[500] }} aria-label="add an alarm" >
         <p>Completed</p>
         <DoneAllIcon />
       </IconButton>}

     
    </ListItem>
   ))}
</List>
</div>

<TodosForm open={open} setOpen={setOpen} value={value} todos={todos} setTodos={setTodos} />
<IconButton onClick={() => AddNewTodo()} sx={{ color: grey[500] }} aria-label="add an alarm" >
        <AddIcon className="add"/>
      </IconButton>
<AddTodo  open={Addopen} setOpen={setAddopen} todos={todos} setTodos={setTodos}/>
<DeleteTodo open={DeleteOpen} setopen={SetDeleteOpen}  onClose={DeleteClose} payload={Deletevalue} todos={todos} SetTodos={setTodos} />
</>
}
export default Todos