import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup({data,SetData}) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Sort</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="completed" control={<Radio />} label="Completed" onClick={() => {
        const sortedData = [...data].sort((a, b) => a.completed - b.completed);
         SetData(sortedData); 
}} />
    <FormControlLabel value="id" control={<Radio />} label="ID" onClick={() => {
        const sortedData = [...data].sort((a, b) => a._id.localeCompare(b._id));
        SetData(sortedData); 
     }} />
        <FormControlLabel value="alphabet" control={<Radio />} label="Alphabet" onClick={() => {
        const sortedData = [...data].sort((a, b) => a.title.localeCompare(b.title));
        SetData(sortedData); 
 
    
   
  }}/>
       
      </RadioGroup>
    </FormControl>
  );
}