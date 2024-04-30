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
import Product from './components/Product';
import Store from './components/Store';
import Cart from './components/Cart';
import Shop from './components/Shop';
import SendMail from './components/SendMail';
import ThemeToggleBtn from './components/ThemeToggleBtn';

function App({ store }) {
  return (
    <Router>
      <div className="App">
        <div className="App-body">
          <Appbar store={store} />
          <Routes> {/* Changed Switch to Routes */}
            <Route path="/home" element={<Home />} /> {/* Changed exact to element */}
            <Route path="/registration" element={<Registration />} /> {/* Changed exact to element */}
            <Route path="/login" element={<Login store={store} />} /> {/* Changed exact to element */}
            <Route path="/sendmail" element={<SendMail />} /> {/* Changed exact to element */}
            <Route path="/cart" element={<Cart />} /> {/* Changed exact to element */}
            <Route path="/profile" element={localStorage.getItem("role") === "1" ? <Profile /> : <Error />} /> {/* Changed render to element */}
            <Route path="/entry" element={localStorage.getItem("role") === "1" ? <Entry /> : <Error />} /> {/* Changed render to element */}
            <Route path="/details" element={(localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2") ? <Details /> : <Error />} /> {/* Changed render to element */}
            <Route path="/detail" element={(localStorage.getItem("role") === "1" ) ? <Detail /> : <Error />} /> {/* Changed render to element */}
            <Route path="/shop" element={localStorage.getItem("role") === "1" ? <Shop /> : <Error />} /> {/* Changed render to element */}
            <Route path="/store" element={(localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2") ? <Store /> : <Error />} /> {/* Changed render to element */}
            <Route path="*" element={<Error />} /> {/* Changed exact to element */}
          </Routes> {/* Changed Switch to Routes */}
          <ThemeToggleBtn />
        </div>
      </div>
    </Router>
  );
}

export default App;
