import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function Shop() {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        status: 'select',
        price: '',
        rating: '',
        date: ''
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = () => {
        axios.post('http://localhost:8081/shop', formData)
            .then((response) => {
                console.log(response.data);
            });
    };

    const handleUpdate = () => {
        axios.put('http://localhost:8081/shop', formData)
            .then((response) => {
                console.log(response.data);
            });
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', width: '300px', margin: 'auto',marginTop: '70px'  }}>
            <TextField
                label="ID"
                name="id"
                value={formData.id}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Select
                label="Colours Available"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
                margin="normal"
            >
                <MenuItem value="select">Select Colours Available</MenuItem>
                <MenuItem value="Placed">White</MenuItem>
                <MenuItem value="Not Placed">Black</MenuItem>
            </Select>
            <TextField
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Rating"
                name="rating"
                type="number"
                value={formData.rating}
                onChange={handleChange}
                fullWidth
                margin="normal"
                inputProps={{ min: 1, max: 5 }}
            />
            <TextField
                label="Date Available For Delivery"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginRight: '10px',backgroundColor: 'darkblue', }}>
                Save Data
            </Button>
            <Button variant="contained" color="primary" onClick={handleUpdate} style={{ marginRight: '10px',backgroundColor: 'darkblue', }}>
                Update Data
            </Button>
        </Paper>
    );
}
