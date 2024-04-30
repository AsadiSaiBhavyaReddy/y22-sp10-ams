import React, { useState, useEffect } from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';

export default function Details() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minRating, setMinRating] = useState('');
    const [maxRating, setMaxRating] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/store')
            .then(response => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleFilter = () => {
        let filtered = data.filter((item) => {
            let priceInRange = true;
            let ratingInRange = true;

            if (minPrice && maxPrice) {
                priceInRange = parseInt(item.price) >= parseInt(minPrice) && parseInt(item.price) <= parseInt(maxPrice);
            }
            if (minRating && maxRating) {
                ratingInRange = parseInt(item.rating) >= parseInt(minRating) && parseInt(item.rating) <= parseInt(maxRating);
            }

            return priceInRange && ratingInRange;
        });
        setFilteredData(filtered);
    };

    const handleSearch = () => {
        let filtered = data.filter((item) => {
            return item.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredData(filtered);
    };

    const handleAddToCart = (item) => {
        setCartItems(prevItems => [...prevItems, item]);
    };

    const removeFromCart = (index) => {
        setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const toggleCartDrawer = (event) => {
        setAnchorEl(event.currentTarget);
        setCartOpen(!cartOpen);
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + parseInt(item.price), 0);

    return (
        <div>
            <AppBar position="static" style={{ backgroundColor: '#1976d2' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
                    <TextField
                        label="Search by Product Name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        variant="outlined"
                        sx={{ ml: 2, width: '300px' }}
                    />
                    <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} onClick={handleSearch}>
                        Search
                    </Button>
                    <IconButton color="inherit" onClick={toggleCartDrawer}>
                        <Badge badgeContent={cartItems.length} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={2}>
                    <div>
                        <Typography variant="h5" gutterBottom>Filter</Typography>
                        <TextField
                            label="Min Price"
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            label="Max Price"
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            label="Min Rating"
                            type="number"
                            value={minRating}
                            onChange={(e) => setMinRating(e.target.value)}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            label="Max Rating"
                            type="number"
                            value={maxRating}
                            onChange={(e) => setMaxRating(e.target.value)}
                            variant="outlined"
                            fullWidth
                        />
                        <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={handleFilter}>
                            Apply Filter
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <Container sx={{ mt: 2 }}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Welcome to our store!
                        </Typography>
                        <Grid container spacing={3}>
                            {filteredData.map((user, index) => (
                                <Grid item key={user.sid} xs={12} sm={6} md={4}>
                                    <Card variant="outlined">
                                        <CardContent>
                                           
                                            <Typography variant="body1">
                                                Product Name: {user.name}
                                            </Typography>
                                            
                                            <Typography variant="body1">
                                                Price: {user.price}
                                            </Typography>
                                            <Typography variant="body1">
                                                Rating: {user.rating}
                                            </Typography>
                                            <Typography variant="body1">
                                                Dates Available For Delivery: {user.date}
                                            </Typography>
                                            <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={() => handleAddToCart(user)}>
                                                Add to Cart
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
            <div>
                <Popover
                    open={cartOpen}
                    anchorEl={anchorEl}
                    onClose={toggleCartDrawer}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    PaperProps={{
                        style: {
                            width: '350px',
                            maxHeight: '400px',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            zIndex: 9999,
                        },
                    }}
                >
                    <div style={{ padding: '10px', height: '100%', overflowY: 'auto' }}>
                        <IconButton style={{ position: 'absolute', top: '5px', right: '5px' }} onClick={toggleCartDrawer}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" gutterBottom>
                            Cart
                        </Typography>
                        <Divider />
                        {cartItems.map((item, index) => (
                            <div key={index}>
                                <Card variant="outlined" style={{ width: '100%', marginBottom: '10px' }}>
                                    <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <Typography variant="h6" component="h3">
                                                Product Name: {item.name}
                                            </Typography>
                                            <Typography variant="body1">
                                                Price: {item.price}
                                            </Typography>
                                        </div>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => removeFromCart(index)}
                                        >
                                            Remove
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                        <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                            Total Price: {totalPrice}
                        </Typography>
                    </div>
                </Popover>
            </div>
        </div>
    );
}
