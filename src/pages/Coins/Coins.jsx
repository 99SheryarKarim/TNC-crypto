import React, { useEffect, useState } from "react";
import "./Coins.css"; // Ensuring consistent styling
import { motion } from "framer-motion"; // Adding subtle animations

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0); // Track retry attempts

  const fetchCoins = async (retries = 3) => {
    try {
      console.log("Fetching crypto data...");
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Invalid or empty data received.");
      }

      setCoins(data);
      setLoading(false);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching coins:", err.message);

      if (retries > 0) {
        console.log(`Retrying in 2 seconds... (${3 - retries + 1}/3)`);
        setTimeout(() => fetchCoins(retries - 1), 2000);
      } else {
        setError("Failed to fetch coin data. Please try again later.");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [retry]); // Depend on `retry` to refetch on retry attempts

  return (
    <div className="coins-section">
      <motion.h1
        className="coins-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Top 100 Cryptocurrencies
      </motion.h1>

      {loading ? (
        <p className="loading-text">Fetching latest market data...</p>
      ) : error ? (
        <div>
          <p className="error-text">{error}</p>
          <button className="retry-button" onClick={() => setRetry(retry + 1)}>
            Retry
          </button>
        </div>
      ) : (
        <div className="coins-table-wrapper">
          <table className="coins-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Coin</th>
                <th>Price</th>
                <th>24h Change</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin, index) => {
                const isPositive = coin.price_change_percentage_24h >= 0;

                return (
                  <motion.tr
                    key={coin.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                  >
                    <td>{index + 1}</td>
                    <td className="coin-info">
                      <img src={coin.image} alt={coin.name} className="coin-image" />
                      {coin.name}
                    </td>
                    <td>${coin.current_price.toLocaleString()}</td>
                    <td
                      className={isPositive ? "positive" : "negative"}
                      style={{ color: isPositive ? "#90EE90" : "#FF7F7F" }}
                    >
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Coins;
