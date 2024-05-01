import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardFlip from 'react-card-flip';
import royal from './royal.jpg'; // Import local images
import royal1 from './royal1.jpg';
import royal2 from './royal2.jpg';
import car1 from './car1.jpeg';
import bike4 from './bike4.jpg';
import parts1 from './parts1.jpg';

// CSS styles for the component
const styles = {
  homeContainer: {
    fontFamily: 'Arial, sans-serif',
  },
  aboutUsBox: {
    backgroundColor: 'black',
    color: 'white',
    padding: '20px',
    marginTop: '30px',
  },
  sliderImageContainer: {
    width: '90%',
    height: '550px',
  },
  cardFront: {
    width: '300px',
    height: '350px',
    objectFit: 'cover',
  },
  cardBack: {
    width: '300px',
    height: '350px', // Same as cardFront height
    backgroundColor: 'black', // Adjust the background color as needed
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
  },
};

const HomePage = () => {
  // Images for the slideshow
  const images = [royal1, royal2, royal]; // Use imported images

  // State for controlling flip cards and current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000, // Autoplay speed in milliseconds (5 seconds)
  };

  // Handle slide change
  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  // State variables for each card's flip status
  const [isFlipped1, setIsFlipped1] = useState(false);
  const [isFlipped2, setIsFlipped2] = useState(false);
  const [isFlipped3, setIsFlipped3] = useState(false);

  const handleCardClick1 = () => {
    setIsFlipped1(!isFlipped1);
  };

  const handleCardClick2 = () => {
    setIsFlipped2(!isFlipped2);
  };

  const handleCardClick3 = () => {
    setIsFlipped3(!isFlipped3);
  };

  return (
    <div className="home-container" style={styles.homeContainer}>
      <h1>Welcome to Automobile Management Application</h1>
      <Slider {...settings} beforeChange={handleSlideChange} initialSlide={currentSlide}>
        {images.map((image, index) => (
          <div key={index}>
            {/* Use a container with fixed dimensions for the images */}
            <div style={styles.sliderImageContainer}>
              <img src={image} alt={`Slide ${index + 1}`} style={{ ...styles.cardFront, width: '100%', height: '100%' }} />
            </div>
          </div>
        ))}
      </Slider>

      {/* About Us Box */}
      <div className="about-us-box" style={styles.aboutUsBox}>
        <h2>About Us</h2>
        <p>
          The proposed project is developed to manage the automobile in the automobile dealer company. Our Website, where finding and buying cars and bikes is made simple and stress-free. We've created a place where you can explore a wide range of vehicles, from cars to motorcycles, and easily make your purchase online. Our detailed listings provide all the information you need, like specs, photos, and prices, so you can make the right choice. Plus, our friendly team is here to help you along the way, whether you have questions or need assistance. Start your journey with us today and find the perfect ride for you!
        </p>
      </div>

      {/* Flip Card Container */}
      <div className="flip-card-container" style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-around' }}>
        {/* First Card */}
        <CardFlip isFlipped={isFlipped1} flipDirection="horizontal">
          <div className="flip-card-front" onClick={handleCardClick1}>
            <img src={car1} alt="Front" style={styles.cardFront} />
          </div>
          <div className="flip-card-back" onClick={handleCardClick1} style={styles.cardBack}>
            <h3>Cars</h3>
            <p>Explore our extensive collection of cars with prices and detailed descriptions. From sleek sedans to rugged SUVs, each vehicle comes with comprehensive information about features, specifications, and more. Find your dream car with ease.</p>
          </div>
        </CardFlip>

        {/* Second Card */}
        <CardFlip isFlipped={isFlipped2} flipDirection="horizontal">
          <div className="flip-card-front" onClick={handleCardClick2}>
            <img src={bike4} alt="Front" style={styles.cardFront} />
          </div>
          <div className="flip-card-back" onClick={handleCardClick2} style={styles.cardBack}>
            <h3>Bikes</h3>
            <p>Discover our range of bikes with prices and detailed descriptions. From sporty cruisers to nimble street bikes, each motorcycle comes with comprehensive information about features, specifications, and more. Find your perfect ride with ease.</p>
          </div>
        </CardFlip>

        {/* Third Card */}
        <CardFlip isFlipped={isFlipped3} flipDirection="horizontal">
          <div className="flip-card-front" onClick={handleCardClick3}>
            <img src={parts1} alt="Front" style={styles.cardFront} />
          </div>
          <div className="flip-card-back" onClick={handleCardClick3} style={styles.cardBack}>
            <h3>Store-Car & Bike Products</h3>
            <p>Explore our automotive emporium for a wide range of car and bike accessories. From performance upgrades to stylish add-ons, we have something for everyone. With user-friendly navigation and secure payments, shopping is a breeze.</p>
          </div>
        </CardFlip>
      </div>
    </div>
  );
};

export default HomePage;
