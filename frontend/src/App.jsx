import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavBar';
import SearchBarSection from './components/SearchBarSection';
import QueueDirectory from './components/QueueDirectory';
import ShopDetails from './components/ShopDetails';
import MyQueues from './components/MyQueues';
import BusinessLogin from './components/BusinessLogin';
import About from './components/About';
import Help from './components/Help';
import Profile from './components/Profile'
import Settings from './components/Settings';


function App() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/home" element={<SearchBarSection />} />
        <Route path="/queue-directory" element={<QueueDirectory />} />
        <Route path="/queue-directory/:shopId/book" element={<ShopDetails/>}/>
        <Route path="/myqueues" element={<MyQueues />} />
        <Route path="/business-login" element={<BusinessLogin />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;