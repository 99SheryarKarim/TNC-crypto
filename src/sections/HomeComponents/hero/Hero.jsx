import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";
import hero from "../../../assets/hero.webp";

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};

const Hero = () => {
  return (
  <div style={{background:"red",maxWidth:"1440px",margin:"0 auto"}}>
      <section  className="hero">
      <div className="hero-left">
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Experience the Future <br /> of Cryptocurrency <br /> Trading
        </motion.h1>

        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Dive into a seamless and secure platform designed for both beginners and
          seasoned traders. Navigate the dynamic world of cryptocurrencies with
          TNC Crypto.
        </motion.p>

        <div className="hero-buttons">
          <motion.button 
            className="pricing-btn"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={2}
            whileHover={{ scale: 1.1, backgroundColor: "#ff7b00" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Pricing Table
          </motion.button>
          
          <motion.button 
            className="download-btn"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={3}
            whileHover={{ scale: 1.1, backgroundColor: "#008aff" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Download App
          </motion.button>
        </div>
      </div>
      <div className="hero-right">
        <motion.img 
          src={hero} 
          alt="Website Logo" 
          className="hero-image"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: "easeOut" }}
        />
      </div>
    </section>
  </div>
  );
};

export default Hero;