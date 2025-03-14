import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./Discover.css";
import discoverImage from "../../../assets/chip.webp"; // Ensure this path is correct

const Discover = () => {
  // Hooks for intersection observer
  const { ref: leftRef, inView: leftInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: rightRef, inView: rightInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: empowerRef, inView: empowerInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <>
      {/* Discover Section */}
      <section className="discover">
        {/* Left Section - Image */}
        <motion.div
          ref={leftRef}
          className="discover-left"
          initial={{ opacity: 0, x: -50 }}
          animate={leftInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <img src={discoverImage} alt="Discover Crypto" className="discover-image" />
        </motion.div>

        {/* Right Section - Text */}
        <motion.div
          ref={rightRef}
          className="discover-right"
          initial={{ opacity: 0, x: 50 }}
          animate={rightInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
        >
          <h2>Discover the Future of Finance with <span className="highlight">SAIGE AI</span></h2>
          <ul className="discover-list">
            <li>
              <span className="bullet"></span>
              <p>Bitcoin Surges Past $100,000: What's Driving the Rally?</p>
            </li>
            <li>
              <span className="bullet"></span>
              <p>Tech Stocks to Watch in 2025: AI and Quantum Computing Leaders</p>
            </li>
            <li>
              <span className="bullet"></span>
              <p>Decentralized Finance (DeFi) Revolution: How It's Reshaping Banking</p>
            </li>
          </ul>
        </motion.div>
      </section>

      {/* Crypto Section */}
      <section className="crypto">
        <motion.div
          ref={empowerRef}
          className="empower"
          initial={{ opacity: 0, y: 50 }}
          animate={empowerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <h1>Empowering Your Cryptocurrency <br /> Journey</h1>
        </motion.div>
      </section>

      {/* Video Section */}
      <div className="animvideo">
        <video width="100%" height="auto" autoPlay loop muted playsInline>
          <source src="64b0e26d47182da9cb63e551_-ebb1-4a54-ad70-1c3c8ebd2d34-transcode.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
};

export default Discover;
