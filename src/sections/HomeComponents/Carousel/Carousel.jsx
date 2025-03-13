import React from "react";
import Marquee from "react-fast-marquee";
import "./Carousel.css";

const brands = [
  "Oracle", "Toshiba", "Google", "Etisalat", "Netflix",
  "Toshiba", "Business Insider",  "Oracle", "Toshiba", "Google", "Etisalat", "Netflix",
  "Toshiba", "Business Insider", "Oracle", "Toshiba", "Google", "Etisalat", "Netflix",
  "Toshiba", "Business Insider",  "Oracle", "Toshiba", "Google", "Etisalat", "Netflix",
  "Toshiba", "Business Insider"
];

const BrandCarousel = () => {
  return (
    <div className="carousel-container">
      <Marquee 
        gradient={false} 
        speed={50} 
        direction="right" // Moves left to right
      >
        {brands.map((brand, index) => (
          <span key={index} className="carousel-item">
            {brand}
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default BrandCarousel;
