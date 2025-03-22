import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import CheckIcon from '@mui/icons-material/Check';
import GroupIcon from '@mui/icons-material/Group';
import CollectionsIcon from '@mui/icons-material/Collections';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


const SideList=()=>{
    return (
        <List
          sx={{ width: '250%', maxWidth: 250, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
             <div>Options</div> 
            </ListSubheader>
          }
        >
            <ListItemButton href="/todos">
        <ListItemIcon>
          <CheckIcon  />
        </ListItemIcon>
        <ListItemText primary="Todos" />
      </ListItemButton>

      <ListItemButton href="/photos">
        <ListItemIcon>
          <CollectionsIcon />
        </ListItemIcon>
        <ListItemText primary="Photos" />
      </ListItemButton>

      <ListItemButton href="/users">
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>

      <ListItemButton href="/posts">
        <ListItemIcon>
          <FormatListBulletedIcon/>
        </ListItemIcon>
        <ListItemText primary="Posts" />
      </ListItemButton>
      
            </List>
)}
export default SideList
