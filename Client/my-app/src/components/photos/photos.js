import  Axios  from "axios"
import { useEffect,useState } from "react"
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import UpdatePhotosForm from "./UpdetPhoto"
import AddPhotosForm from"./AddPhoto"
import AddIcon from '@mui/icons-material/Add';
import {green } from '@mui/material/colors';
import DeletePhoto from "./DeletePhoto"
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
 const Photos=()=>{
    const[photos,SetPhotos]=useState ([])
    const[openUpdet,SetOpenUpdet]=useState (false)
    const[updetValue,SetUpdetValue]=useState ([])
    const[openAdd,SetOpenAdd]=useState (false)
    const[openDelete,SetOpenDelete]=useState (false)
    const[DeletValue,SetDeletValue]=useState ([])
    const LoadData=async()=>{
        try{
        const res=await Axios.get("http://localhost:1500/api/photo")
        SetPhotos(res.data)
       }
        catch(e){
            console.log(e)
            SetPhotos([])
        }
        
       
    }
    useEffect(()=>{
        LoadData()
    },[])
    const UpdateThisPhoto=(id)=>{
        SetUpdetValue(id)
        SetOpenUpdet(true)
    }
    const DeleteThisPhoto=(value)=>{
        SetDeletValue(value)
        SetOpenDelete(true)
    }
    const AfterDelete=()=>{
        SetOpenDelete(false)
    }
    const AddNewPhoto=()=>{
        SetOpenAdd(true)
    }
return(<>
   <span className="list">
    <ImageList sx={{ width: 400, height: 300 }}>
    <ImageListItem key="Subheader" cols={2}>
      <ListSubheader component="div">Photos</ListSubheader>
    </ImageListItem>
    {photos.map((item) => (
      <ImageListItem key={item._id}>
        <img
        
          srcSet={item.imageUrl}
          src={item.imageUrl}
          loading="lazy"
        />
        <ImageListItemBar
          title={item.title}
         
          actionIcon={<>
            <IconButton
              onClick={() => UpdateThisPhoto(item._id)}
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about ${item.title}`}
            >
              <InfoIcon />
             
            </IconButton>
            <IconButton
            onClick={() => DeleteThisPhoto(item)}
            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
            aria-label={`info about ${item.title}`}
          >
             <AutoDeleteIcon />
             </IconButton>
             </>
          }
         
        />
      </ImageListItem>
    ))}
    
  </ImageList>
  </span>
  <UpdatePhotosForm open={openUpdet} setOpen={SetOpenUpdet} value={updetValue} SetPhotos={SetPhotos} photos={photos}/>
  <AddPhotosForm open={openAdd} setOpen={SetOpenAdd} SetPhotos={SetPhotos} photos={photos}/>
  <IconButton className="add"  onClick={() => AddNewPhoto()} sx={{ color: green[500] }} aria-label="add an alarm" >
   <AddIcon  className="add"/>
  </IconButton>
  <DeletePhoto open={openDelete} setopen={SetOpenDelete} payload={DeletValue} SetPhotos={SetPhotos} photos={photos} onClose={AfterDelete}/>
 
  </>
)
 }
export default Photos