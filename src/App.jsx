import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Cursor from "./Cursor";
import Dropdown from "./Dropdown";
import Footer from "./Footer";
import Home from "./Home";
import About_cisks from "./About/About_cisks";
import Vision_mission from "./About/Vision_mission";
import Objective from "./About/Objective";
import Focus_area from "./About/Focus_area";
import Research_area from "./Research/Research_area";
import Faculty from "./People/Faculty";
import Gallery from "./Outreach/Gallery";
import Events from "./Outreach/Events/Events";
import Preloader from "./Preloader"; 
import Book from "./Publication/Book";
import Login from "./Publication/Login_page/Login";
import Registration from "./Publication/Registration/Register";
import Automail from "./Automail/Automail";
import My_profile from "./Publication/My_profile/My_profile";
import Forget_password from "./Publication/Forget_password/Forget_password";
import Projects from "./Projects/Projects";
import Staff from "./People/Staff";
import Error from "./Error/Error";
import Internship from "./Opportunity/Internship";
import AdminPanel from './Admin_panel';




function App() {
  const [loading, setLoading] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const preloaderShown = sessionStorage.getItem("preloaderShown");

    if (!preloaderShown) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("preloaderShown", "true");
      }, 2500); // Show preloader for 2.5s
    }
  }, []);

  if (loading) {
    return <Preloader />;
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 100); // adjust scroll threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <Navbar />
      <Dropdown />
      <Cursor />
      <a href="#Navbar_brand" className={`Top_btn ${showTopButton ? 'visible' : ''}`}>
          <button>⬆️</button>
      </a>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/About_cisks" element={<About_cisks />} />
        <Route exact path="/Vision_mission" element={<Vision_mission />} />
        <Route exact path="/Objective" element={<Objective />} />
        <Route exact path="/Focus_area" element={<Focus_area />} />
        <Route exact path="/Research_area" element={<Research_area />} />
        <Route exact path="/People/Faculty" element={<Faculty />} />
        <Route exact path="/Gallery" element={<Gallery />} />
        <Route exact path="/Events" element={<Events />} />
        <Route exact path="/BOOKS" element={<Book />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Register" element={<Registration />} />
        <Route exact path="/auotmail" element={<Automail />} />
        <Route exact path="/My_profile" element={<My_profile />} />
        <Route exact path="/Forget_password" element={<Forget_password />} />
        <Route exact path="/Projects" element={<Projects />} />
        <Route exact path="/People/Staff" element={<Staff />} />
        <Route exact path="/Internship" element={<Internship />} />
        <Route exact path="/AdminPanel" element={<AdminPanel />} />
        <Route  path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
