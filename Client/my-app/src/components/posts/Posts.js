import  Axios  from "axios"
import { useEffect,useState,useRef } from "react"
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {grey } from '@mui/material/colors';
import {green } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import {red } from '@mui/material/colors';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import UpdatePostForm from "./UpdetPost";
import ListItemText from '@mui/material/ListItemText';
import AddPostForm from "./AddPost"
import AddIcon from '@mui/icons-material/Add';
import DeletePost from "./DeletePost"
import TextField from '@mui/material/TextField';
import { getLuminance } from "@mui/material";
import SortPost from "./SortPost"

const Posts=()=>{
const[posts,SetPosts]=useState ([])
const [open, setOpen] = useState(false);
const [Addopen, setAddopen] = useState(false);
const [value, setValue] = useState("");
const [Deletevalue,SetDeletevalue] =useState({})
const [DeleteOpen,SetDeleteOpen] =useState()
const [inputValue, setInputValue] = useState("");


const LoadData=async()=>{
  
    try{
      
    const res=await Axios.get("http://localhost:1500/api/post")
    SetPosts(res.data)
   }
    catch(e){
        console.log(e)
        SetPosts([])
    }
 
}
const withValue=()=>{
  SetPosts(posts.filter(item=> item.body.includes(inputValue)))
}
useEffect(()=>{
    LoadData()
},[])

useEffect(()=>{
  if(inputValue)
    withValue()
  else{
    LoadData()
  }
 },[inputValue])

const UpdatePost=(id)=>{
    setValue(id)
    setOpen(true)
}
const DeleteThisPost=(value)=>{
  SetDeletevalue(value)
  SetDeleteOpen(true)

}
const DeleteClose=()=>{
  SetDeleteOpen(false)
}
const AddNewPost=()=>{
    setAddopen(true)
}
//if(posts.length===0) return <h1>Loading</h1>
return <>
<div className="list">
      <h3>Posts</h3>
      <SortPost data= {posts} SetData={SetPosts} />
      <TextField onChange={(e) => {setInputValue(e.target.value) }}   id="outlined-basic" label="Search by text" variant="outlined" />
    <List  sx={{ width: '400%', maxWidth: 400, bgcolor: 'background.paper' }}>
  {posts.map((value) => (
    
    <ListItem
    
      key={value._id}
      disableGutters
     
    >
           
       <ListItemText primary={value.title} secondary={value.body} />
      <IconButton onClick={() => DeleteThisPost(value)} sx={{ color: red[500] }} aria-label="add an alarm" >
        <AutoDeleteIcon />
      </IconButton>
      <IconButton onClick={() => UpdatePost(value._id)} sx={{ color: grey[500] }} aria-label="add an alarm" >
        <CreateIcon />
      </IconButton>
     
    </ListItem>
   ))}
</List>
</div>


<UpdatePostForm open={open} setOpen={setOpen} value={value} posts={posts }SetPost={SetPosts}/>
<AddPostForm open={Addopen} setOpen={setAddopen} posts={posts }SetPost={SetPosts}/>
<IconButton onClick={() => AddNewPost()} sx={{ color: green[500] }} aria-label="add an alarm" >
 <AddIcon className="add"/>
 </IconButton>
 <DeletePost open={DeleteOpen} setopen={SetDeleteOpen} posts={posts }SetPost={SetPosts} onClose={DeleteClose} payload={Deletevalue} />
</>
}
export default Posts