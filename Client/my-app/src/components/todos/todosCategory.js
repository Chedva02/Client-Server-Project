import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const options = ['House', 'Home','Class'];

export default function ControllableStates({setInput}) {
  const [value, setValue] = React.useState(" ");
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div >
      
      <br />
      <Autocomplete className="Input"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setInput(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search by category" />}
      />
      
    </div>

  );
}