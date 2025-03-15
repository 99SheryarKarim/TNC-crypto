
"use client";
  
import { useState } from "react";
import { Link } from "react-router-dom";
import "../pages/Home.css";
import logo from "../assets/logo.webp";
import Hero from "../sections/HomeComponents/hero/Hero";

import Discover from "../sections/HomeComponents/Discover/Discover";
import WhyUs from "../sections/HomeComponents/WhyUs/WhyUs";
import PricingCards from "../sections/HomeComponents/Pricing/Pricing";
import Info from "./../pages/Info/Info";
import JoinUs from "../sections/HomeComponents/JoinUs/JoinUs";
import Footer from "./Footer/Footer";
import Contact from "./ContactUs/Contact";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleContactClick = () => {
    setShowContact(true);
  };

  return (
    <main style={{backgroundColor:"#1e2340"}}>
      {/* Header Section */}
   

      {/* Show Contact page only when button is clicked */}
      {showContact ? (
        <Contact />
      ) : (
        <>
          <Hero />
          {/* <Carousel /> */}
          <div style={{ marginTop: "-105px" }}>
            <Discover />
          </div>
          <WhyUs />
          <PricingCards />
          {/* <Info /> */}
          <JoinUs />
          <Footer />
        </>
      )}
    </main>
  );
}

export default Home;
