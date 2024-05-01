import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Changed Switch to Routes
import Registration from './components/Registration';
import Login from './components/Login';
import Appbar from './components/Appbar';
import Profile from './components/Profile';
import Entry from './components/Entry';
import Details from './components/Details';
import Error from './components/Error';
import Home from './components/Home';
import Detail from './components/Detail';
import Store from './components/Store';
import Cart from './components/Cart';
import Shop from './components/Shop';
import SendMail from './components/SendMail';
import ThemeToggleBtn from './components/ThemeToggleBtn';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-body">
          <Appbar />
          <Routes> {/* Changed Switch to Routes */}
            <Route path="/home" element={<Home />} /> {/* Changed exact to element */}
            <Route path="/registration" element={<Registration />} /> {/* Changed exact to element */}
            <Route path="/login" element={<Login />} /> {/* Changed exact to element */}
            <Route path="/sendmail" element={<SendMail />} /> {/* Changed exact to element */}
            <Route path="/cart" element={<Cart />} /> {/* Changed exact to element */}
            <Route path="/profile" element={<Profile />} /> {/* Changed exact to element */}
            <Route path="/entry" element={<Entry />} /> {/* Changed exact to element */}
            <Route path="/details" element={<Details />} /> {/* Changed exact to element */}
            <Route path="/detail" element={<Detail />} /> {/* Changed exact to element */}
            <Route path="/shop" element={<Shop />} /> {/* Changed exact to element */}
            <Route path="/store" element={<Store />} /> {/* Changed exact to element */}
            <Route path="*" element={<Error />} /> {/* Changed exact to element */}
          </Routes> {/* Changed Switch to Routes */}
          <ThemeToggleBtn />
        </div>
      </div>
    </Router>
  );
}

export default App;
