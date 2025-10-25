import { useEffect, useState } from "react";
import "../../styles/hero.css";

function Hero({ images }) {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Défilement automatique toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [length]);

  // Navigation manuelle
  const nextSlide = () => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  return (
    <div className="carousel">
      {/* Les slides */}
      <div className="carousel_wrapper">
        {images.map((slide, index) => (
          <div
            key={index}
            className={`carousel_card ${index === current ? "active" : ""}`}
          >
            <img src={slide.image} alt={slide.title} className="carousel_image" />
            <div className="text-content">
              <h2>{slide.title}</h2>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Boutons navigation */}
      <button className="nav_button prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="nav_button next" onClick={nextSlide}>
        ❯
      </button>

      {/* Indicateurs */}
      <div className="indicators">
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            className={`dot ${i === current ? "active" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Hero;

