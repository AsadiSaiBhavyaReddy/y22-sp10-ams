import React, { useState, useEffect, useMemo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Details() {
    const [filteredData, setFilteredData] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minRating, setMinRating] = useState('');
    const [maxRating, setMaxRating] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    // Sample data of 20 cards
    const data = useMemo(() => [
      { sid: 1, name: "Car Washing Kit", price: "500", rating: "4.5", date: "2024-05-01" },
      { sid: 2, name: "Bike Gloves", price: "200", rating: "4", date: "2024-05-02" },
      { sid: 3, name: "Helmet", price: "1000", rating: "4.8", date: "2024-05-03" },
      { sid: 4, name: "Car Safety Kit", price: "800", rating: "4.7", date: "2024-05-04" },
      { sid: 5, name: "Wheel Brush", price: "300", rating: "4.5", date: "2024-05-05" },
      { sid: 6, name: "Tire Inflator", price: "1500", rating: "4.6", date: "2024-05-06" },
      { sid: 7, name: "Car Polish", price: "400", rating: "4.2", date: "2024-05-07" },
      { sid: 8, name: "Car Wax", price: "600", rating: "4.9", date: "2024-05-08" },
      { sid: 9, name: "Seat Covers", price: "1000", rating: "4.3", date: "2024-05-09" },
      { sid: 10, name: "Dash Cam", price: "2000", rating: "4.1", date: "2024-05-10" },
      { sid: 11, name: "Car Air Freshener", price: "150", rating: "4.6", date: "2024-05-11" },
      { sid: 12, name: "Car Floor Mats", price: "300", rating: "4.3", date: "2024-05-12" },
      { sid: 13, name: "Emergency Car Tool Kit", price: "700", rating: "4.7", date: "2024-05-13" },
      { sid: 14, name: "Car Vacuum Cleaner", price: "1000", rating: "4.5", date: "2024-05-14" },
      { sid: 15, name: "Car Phone Holder", price: "200", rating: "4.2", date: "2024-05-15" },
      { sid: 16, name: "Windshield Sun Shade", price: "150", rating: "4.4", date: "2024-05-16" },
      { sid: 17, name: "Car Trunk Organizer", price: "400", rating: "4.6", date: "2024-05-17" },
      { sid: 18, name: "Car Emergency Light", price: "250", rating: "4.5", date: "2024-05-18" },
      { sid: 19, name: "Car USB Charger", price: "100", rating: "4.7", date: "2024-05-19" },
      { sid: 20, name: "Car Wash Shampoo", price: "200", rating: "4.3", date: "2024-05-20" }
  ], []);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

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
                            {filteredData.map((item, index) => (
                                <Grid item key={item.sid} xs={12} sm={6} md={4}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="body1">
                                                Product Name: {item.name}
                                            </Typography>
                                            <Typography variant="body1">
                                                Price: {item.price}
                                            </Typography>
                                            <Typography variant="body1">
                                                Rating: {item.rating}
                                            </Typography>
                                            <Typography variant="body1">
                                                Dates Available For Delivery: {item.date}
                                            </Typography>
                                            <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={() => handleAddToCart(item)}>
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
