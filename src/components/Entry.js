import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 2 + ITEM_PADDING_TOP, // Adjusted maxHeight
      width: 250,
    },
  },
};

const names = [
  'White',
  'Black',
  'Grey',
  'Red',
  'Blue',
  'Silver',
  'Brown',
  'Orange',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Entry() {
  const [personName, setPersonName] = useState([]);
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill, we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleSubmit = () => {
    const data = {
      sid: document.getElementById('idsid').value,
      sname: document.getElementById('idsname').value,
      pstatus: personName,
      scompany: document.getElementById('idscompany').value,
      sctc: document.getElementById('idsctc').value,
    };
    axios.post('http://localhost:8081/entry', data)
      .then(() => {
        Swal.fire({
          title: 'Data Saved Successfully',
          icon: 'success',
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred. Please try again later.',
          icon: 'error',
        });
      });
  };

  const handleUpdate = () => {
    const data = {
      sid: document.getElementById('idsid').value,
      sname: document.getElementById('idsname').value,
      pstatus: personName,
      scompany: document.getElementById('idscompany').value,
      sctc: document.getElementById('idsctc').value,
    };
    axios.put('http://localhost:8081/entry', data)
      .then(() => {
        Swal.fire({
          title: 'Data Updated Successfully',
          icon: 'success',
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred. Please try again later.',
          icon: 'error',
        });
      });
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px', maxWidth: '400px', margin: 'auto', marginTop: '70px' }}>
      <div>
        <div style={{ marginBottom: '10px' }}>
          <InputLabel htmlFor="idsid" style={{ fontWeight: 'bold', color: 'black', textAlign: 'left' }}>SINO:</InputLabel>
          <input type="text" name="sid" id="idsid" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <InputLabel htmlFor="idsname" style={{ fontWeight: 'bold', color: 'black', textAlign: 'left' }}>Automobile Name:</InputLabel>
          <input type="text" name="sname" id="idsname" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <InputLabel htmlFor="idstatus" style={{ fontWeight: 'bold', color: 'black', textAlign: 'left' }}>Colours Available:</InputLabel>
          <FormControl sx={{ m: 1, width: '50%' }}>
            <Select
              id="idstatus"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple" label="Status" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <InputLabel htmlFor="idscompany" style={{ fontWeight: 'bold', color: 'black', textAlign: 'left' }}>Company Name:</InputLabel>
          <input type="text" name="scompany" id="idscompany" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <InputLabel htmlFor="idsctc" style={{ fontWeight: 'bold', color: 'black', textAlign: 'left' }}>Price:</InputLabel>
          <input type="text" name="sctc" id="idsctc" />
        </div>
        <div>
          <button onClick={handleSubmit} style={{ backgroundColor: 'MidnightBlue', color: 'white', padding: '14px 20px', margin: '8px 0', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>Save Data</button>
          <button onClick={handleUpdate} style={{ backgroundColor: 'MidnightBlue', color: 'white', padding: '14px 20px', margin: '8px 0', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>Update Data</button>
        </div>
      </div>
    </Paper>
  );
}
