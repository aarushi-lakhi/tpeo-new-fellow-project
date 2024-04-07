import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({text}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: "10vw" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{text}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label={text}
          onChange={handleChange}
        >
          <MenuItem value={10}>XS</MenuItem>
          <MenuItem value={20}>S</MenuItem>
          <MenuItem value={30}>M</MenuItem>
          <MenuItem value={10}>L</MenuItem>

        </Select>
      </FormControl>
    </Box>
  );
}