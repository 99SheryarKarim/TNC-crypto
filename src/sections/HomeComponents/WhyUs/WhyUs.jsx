import { motion } from "framer-motion";
import "./WhyUs.css";

function WhyUs() {
  return (
    <div className="tnc-container">
      <motion.h1 
        className="tnc-heading"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Why Choose SAIGE AI
      </motion.h1>

      <motion.p 
        className="tnc-subtitle"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Choose SAIGE AI for a secure, innovative, and community-driven cryptocurrency experience.
      </motion.p>

      <div className="features-grid">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h2 className="feature-title">{feature.title}</h2>
            <p className="feature-description">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    title: "Market Analysis",
    description: "Unlock the Secrets of Market Movements",
    icon: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="25" fill="#e6f0fa" />
        <path d="M30 18C25.0294 18 21 22.0294 21 27C21 31.9706 25.0294 36 30 36C34.9706 36 39 31.9706 39 27C39 22.0294 34.9706 18 30 18Z" fill="#0066CC" />
      </svg>
    ),
  },
  {
    title: "Technical Analysis",
    description: "Moving Averages: Understand trend directions with our interactive charts",
    icon: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="30" height="25" rx="2" fill="#e6f0fa" stroke="#0066CC" strokeWidth="2" />
        <rect x="15" y="15" width="30" height="6" fill="#0066CC" />
      </svg>
    ),
  },
  {
    title: "RSI (Relative Strength Index)",
    description: " Gauge overbought and oversold conditions",
    icon: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 10L45 20V40L30 50L15 40V20L30 10Z" fill="#0066CC" />
      </svg>
    ),
  },
  {
    title: "Social Media Sentiment Analysis",
    description: "Track mentions and sentiment across platforms",
    icon: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="25" fill="#e6f0fa" />
        <path d="M25 25H35V35H25V25Z" fill="#0066CC" />
      </svg>
    ),
  },
  {
    title: "Fundamental Analysis",
    description: "Cryptocurrency On-Chain Metrics: Active addresses, transaction volume, and more",
    icon: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="25" fill="#e6f0fa" />
        <path d="M20 30L40 20V40L20 30Z" fill="#0066CC" />
      </svg>
    ),
  },
  {
    title: "Stock Fundamentals",
    description: "P/E ratios, earnings reports, and growth projections",
    icon: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="25" fill="#e6f0fa" />
        <path d="M20 30L40 20V40L20 30Z" fill="#0066CC" />
      </svg>
    ),
  }
];

export default WhyUs;
