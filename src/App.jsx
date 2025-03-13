import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs/Contact";
import Coins from "./pages/Coins/Coins";
import Predict from "./pages/Predict/Predict";
import GoPro from "./pages/GoPro/GoPro";  // ✅ Import GoPro Page
import Header from "./pages/Header/Header";

function App() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/gopro" element={<GoPro />} />  {/* ✅ Add GoPro Route */}
      </Routes>
      {showButton && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed", bottom: "20px", right: "20px",
            backgroundColor: "#007bff", color: "white",
            border: "none", padding: "12px 18px",
            borderRadius: "8px", fontSize: "16px", cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", transition: "all 0.3s ease"
          }}
        >
          ↑
        </button>
      )}
    </Router>
  );
}

export default App;
