"use client"

import { useState, useEffect, useRef } from "react"
import { PredictionStrategy } from "../PredictionStrategy/PredictStratedy"
import "./Predict.css"
import Toast from "../Toast/Toast"

function Predict() {
  const [cryptoData, setCryptoData] = useState([])
  const [selectedCrypto, setSelectedCrypto] = useState(null)
  const [currentPrice, setCurrentPrice] = useState(0)
  const [candleData, setCandleData] = useState([])
  const [selectedTime, setSelectedTime] = useState(11.33)
  const [investment, setInvestment] = useState(1)
  const [pendingTrade, setPendingTrade] = useState(false)
  const [tradeHistory, setTradeHistory] = useState([])
  const [chartOffset, setChartOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [timeFrame, setTimeFrame] = useState("1m")
  const [payout, setPayout] = useState(1.4)
  const canvasRef = useRef(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [selectedStrategy, setSelectedStrategy] = useState("balanced")
  const [isMobile, setIsMobile] = useState(false)
  const chartContainerRef = useRef(null)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Update canvas size on resize
  useEffect(() => {
    let resizeTimer

    const handleResize = () => {
      if (canvasRef.current && chartContainerRef.current) {
        const container = chartContainerRef.current

        // Set explicit dimensions
        canvasRef.current.width = container.clientWidth
        canvasRef.current.height = container.clientHeight
      }
    }

    // Initial sizing with a slight delay to ensure container is rendered
    resizeTimer = setTimeout(handleResize, 300)

    // Add resize listener with debounce
    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 300)
    }

    window.addEventListener("resize", debouncedResize)

    // Clean up
    return () => {
      window.removeEventListener("resize", debouncedResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  // Fetch crypto market data
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
        )

        if (!response.ok) {
          throw new Error("Network response was not ok")
        }

        const data = await response.json()
        setCryptoData(data)

        // Set default selected crypto to Bitcoin
        if (data.length > 0) {
          setSelectedCrypto(data[0])
          setCurrentPrice(data[0].current_price)

          // Generate initial candle data based on current price
          generateInitialCandleData(data[0].current_price)
        }
      } catch (error) {
        console.error("Failed to fetch crypto data:", error)
      }
    }

    fetchCryptoData()

    // Refresh data every 30 seconds
    const interval = setInterval(fetchCryptoData, 30000)
    return () => clearInterval(interval)
  }, [])

  // Generate initial candle data based on current price
  const generateInitialCandleData = (basePrice) => {
    const data = []
    let price = basePrice
    const now = new Date()

    // Generate 100 candles going back in time
    for (let i = 100; i >= 0; i--) {
      const volatility = price * 0.005 // 0.5% volatility
      const open = price
      const close = open + (Math.random() - 0.5) * volatility
      const high = Math.max(open, close) + Math.random() * volatility * 0.5
      const low = Math.min(open, close) - Math.random() * volatility * 0.5

      // Calculate time for this candle (going back in time)
      const candleTime = new Date(now)
      candleTime.setMinutes(now.getMinutes() - i)

      data.push({
        time: candleTime,
        open,
        high,
        low,
        close,
        volume: Math.random() * 100000,
      })

      price = close // Next candle starts at previous close
    }

    setCandleData(data)
  }

  // Update candle data with new price information
  useEffect(() => {
    if (!selectedCrypto || candleData.length === 0) return

    // Use a ref to track if component is mounted
    const isMounted = true

    // Reduce update frequency to prevent flickering
    const updateInterval = setInterval(() => {
      // Update current price with small random change
      const volatility = currentPrice * 0.001 // 0.1% volatility
      const newPrice = currentPrice + (Math.random() - 0.5) * volatility
      setCurrentPrice(newPrice)

      // Update the latest candle
      setCandleData((prevData) => {
        const newData = [...prevData]
        const lastCandle = { ...newData[newData.length - 1] }

        // Update the last candle
        lastCandle.close = newPrice
        lastCandle.high = Math.max(lastCandle.high, newPrice)
        lastCandle.low = Math.min(lastCandle.low, newPrice)

        // Add a new candle if the time has moved to a new minute
        const now = new Date()
        const lastCandleTime = new Date(lastCandle.time)

        if (now.getMinutes() !== lastCandleTime.getMinutes()) {
          // Create a new candle
          newData.push({
            time: now,
            open: lastCandle.close,
            high: lastCandle.close,
            low: lastCandle.close,
            close: newPrice,
            volume: Math.random() * 100000,
          })

          // Remove oldest candle if we have too many
          if (newData.length > 100) {
            newData.shift()
          }
        } else {
          // Just update the last candle
          newData[newData.length - 1] = lastCandle
        }

        return newData
      })
    }, 2000) // Reduced frequency to 2 seconds instead of 1 second

    return () => {
      clearInterval(updateInterval)
    }
  }, [selectedCrypto, currentPrice])

  // Draw the candlestick chart
  useEffect(() => {
    if (!canvasRef.current || candleData.length === 0) return

    // Create a stable drawing function
    const drawChart = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      const width = canvas.width
      const height = canvas.height

      // Clear the canvas
      ctx.clearRect(0, 0, width, height)

      // Draw dark background
      ctx.fillStyle = "#1c2030"
      ctx.fillRect(0, 0, width, height)

      // Draw grid
      ctx.strokeStyle = "#2a2e39"
      ctx.lineWidth = 1

      // Vertical grid lines
      for (let i = 0; i <= width; i += 50) {
        const x = i + (chartOffset.x % 50)
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      // Horizontal grid lines
      for (let i = 0; i <= height; i += 50) {
        const y = i + (chartOffset.y % 50)
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Find min and max prices for scaling
      let minPrice = Number.MAX_VALUE
      let maxPrice = Number.MIN_VALUE

      candleData.forEach((candle) => {
        minPrice = Math.min(minPrice, candle.low)
        maxPrice = Math.max(maxPrice, candle.high)
      })

      // Add some padding
      const padding = (maxPrice - minPrice) * 0.1
      minPrice -= padding
      maxPrice += padding

      // Calculate scaling factors
      const priceRange = maxPrice - minPrice
      const pixelsPerPriceUnit = height / priceRange

      // Draw price scale on the right
      ctx.fillStyle = "#ffffff"
      ctx.font = "12px Arial"
      ctx.textAlign = "right"

      for (let i = 0; i <= 10; i++) {
        const price = minPrice + (priceRange * i) / 10
        const y = height - (price - minPrice) * pixelsPerPriceUnit

        ctx.fillText(price.toFixed(5), width - 10, y)

        // Draw horizontal line for price
        ctx.strokeStyle = "#2a2e39"
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width - 60, y)
        ctx.stroke()
      }

      // Draw time scale at the bottom
      const timeWidth = width / 30 // Show about 30 candles

      for (let i = 0; i < 30; i++) {
        if (candleData.length - 30 + i >= 0) {
          const candle = candleData[candleData.length - 30 + i]
          const x = i * timeWidth + chartOffset.x

          if (i % 5 === 0) {
            // Only show every 5th time label
            const time = new Date(candle.time)
            const timeLabel = `${time.getHours()}:${time.getMinutes().toString().padStart(2, "0")}`

            ctx.fillStyle = "#6b7280"
            ctx.textAlign = "center"
            ctx.fillText(timeLabel, x, height - 5)
          }
        }
      }

      // Draw candles
      const candleWidth = Math.max(timeWidth * 0.8, isMobile ? 8 : 4) // Wider candles on mobile

      // Draw from oldest to newest to ensure proper layering
      for (let i = 0; i < candleData.length; i++) {
        const candle = candleData[i]
        // Calculate x position
        const x = (i - (candleData.length - 30)) * timeWidth + chartOffset.x

        // Skip candles outside the visible area
        if (x < -candleWidth || x > width) continue

        const open = height - (candle.open - minPrice) * pixelsPerPriceUnit
        const close = height - (candle.close - minPrice) * pixelsPerPriceUnit
        const high = height - (candle.high - minPrice) * pixelsPerPriceUnit
        const low = height - (candle.low - minPrice) * pixelsPerPriceUnit

        // Determine candle color (green for up, red for down)
        const isUp = close < open // Note: y-axis is inverted in canvas
        ctx.fillStyle = isUp ? "#26a69a" : "#ef5350"
        ctx.strokeStyle = isUp ? "#26a69a" : "#ef5350"

        // Draw candle body - ensure width is sufficient and minimum height
        const bodyHeight = Math.max(Math.abs(close - open), 1) // Minimum height of 1px
        ctx.fillRect(x - candleWidth / 2, Math.min(open, close), candleWidth, bodyHeight)

        // Draw candle wicks with increased line width for visibility
        ctx.lineWidth = 2 // Increase line width for better visibility
        ctx.beginPath()
        ctx.moveTo(x, high)
        ctx.lineTo(x, Math.min(open, close))
        ctx.moveTo(x, Math.max(open, close))
        ctx.lineTo(x, low)
        ctx.stroke()
      }

      // Draw current price line
      const currentPriceY = height - (currentPrice - minPrice) * pixelsPerPriceUnit
      ctx.strokeStyle = "#4f9bff"
      ctx.lineWidth = 1
      ctx.setLineDash([5, 3])
      ctx.beginPath()
      ctx.moveTo(0, currentPriceY)
      ctx.lineTo(width, currentPriceY)
      ctx.stroke()
      ctx.setLineDash([])

      // Draw current price label
      ctx.fillStyle = "#4f9bff"
      ctx.textAlign = "left"
      ctx.fillText(currentPrice.toFixed(5), 10, currentPriceY - 5)
    }

    // Use requestAnimationFrame for smoother rendering
    requestAnimationFrame(drawChart)
  }, [candleData, chartOffset, currentPrice, isMobile])

  // Handle mouse events for chart interaction
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    setIsDragging(true)
    setDragStart({
      x: e.clientX - chartOffset.x,
      y: e.clientY - chartOffset.y,
    })
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setChartOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      setIsDragging(true)
      setDragStart({
        x: touch.clientX - chartOffset.x,
        y: touch.clientY - chartOffset.y,
      })
    }
  }

  const handleTouchMove = (e) => {
    if (isDragging && e.touches.length === 1) {
      const touch = e.touches[0]
      setChartOffset({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      })
      e.preventDefault() // Prevent scrolling while dragging
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Handle trade execution
  const handleTrade = (direction) => {
    if (pendingTrade) return

    setPendingTrade(true)
    const tradeAmount = investment
    const entryPrice = currentPrice
    const tradeTime = new Date()

    // Show toast notification
    setToastMessage(`${direction.toUpperCase()} order placed successfully!`)
    setShowToast(true)

    // Hide toast after 4 seconds
    setTimeout(() => {
      setShowToast(false)
    }, 4000)

    // Rest of the trade logic...
    setTimeout(
      () => {
        const exitPrice = currentPrice
        const profit =
          direction === "buy"
            ? exitPrice > entryPrice
              ? tradeAmount * payout
              : -tradeAmount
            : exitPrice < entryPrice
              ? tradeAmount * payout
              : -tradeAmount

        setTradeHistory((prev) => [
          {
            direction,
            entryPrice,
            exitPrice,
            amount: tradeAmount,
            profit,
            time: tradeTime.toLocaleTimeString(),
          },
          ...prev,
        ])

        setPendingTrade(false)
      },
      selectedTime * 60 * 1000,
    )
  }

  // Handle investment amount changes
  const decreaseInvestment = () => {
    if (investment > 1) {
      setInvestment((prev) => prev - 1)
    }
  }

  const increaseInvestment = () => {
    setInvestment((prev) => prev + 1)
  }

  // Handle time selection changes
  const decreaseTime = () => {
    if (selectedTime > 0.5) {
      setSelectedTime((prev) => Number((prev - 0.5).toFixed(2)))
    }
  }

  const increaseTime = () => {
    setSelectedTime((prev) => Number((prev + 0.5).toFixed(2)))
  }

  return (
    <div className="predict-container">
      {showToast && <Toast message={toastMessage} type="success" duration={4000} onClose={() => setShowToast(false)} />}

      {/* Header */}
      <div className="predict-header">
        <div className="header-left">
          <div className="platform-name">WEB TRADING PLATFORM</div>
        </div>
        <div className="header-right">
          <div className="notification-icon">
            🔔 <span className="badge">1</span>
          </div>
          <div className="account-balance">
            <div className="balance-label">LIVE ACCOUNT</div>
            <div className="balance-amount">$0.00</div>
          </div>
          <button className="deposit-button">+ Deposit</button>
          <button className="withdrawal-button">Withdrawal</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="predict-content">
        {isMobile ? (
          // Mobile view with chart
          <div className="mobile-view">
            <h1 className="mobile-title">Prediction</h1>

            {/* Chart Container for Mobile */}
            <div className="mobile-chart-container" ref={chartContainerRef}>
              <canvas
                ref={canvasRef}
                style={{ width: "100%", height: "100%" }} // Add inline style
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
            </div>

            <div className="mobile-timeframe-selector">
              <button className={timeFrame === "1m" ? "active" : ""} onClick={() => setTimeFrame("1m")}>
                1m
              </button>
              <button className={timeFrame === "5m" ? "active" : ""} onClick={() => setTimeFrame("5m")}>
                5m
              </button>
              <button className={timeFrame === "15m" ? "active" : ""} onClick={() => setTimeFrame("15m")}>
                15m
              </button>
              <button className={timeFrame === "1h" ? "active" : ""} onClick={() => setTimeFrame("1h")}>
                1h
              </button>
              <button className={timeFrame === "1d" ? "active" : ""} onClick={() => setTimeFrame("1d")}>
                1d
              </button>
            </div>

            <div className="mobile-trading-controls">
              <div className="mobile-investment-control">
                <div className="control-label">Investment</div>
                <div className="control-buttons">
                  <button onClick={decreaseInvestment}>−</button>
                  <span>${investment}</span>
                  <button onClick={increaseInvestment}>+</button>
                </div>
              </div>

              <div className="mobile-time-control">
                <div className="control-label">Time</div>
                <div className="control-buttons">
                  <button onClick={decreaseTime}>−</button>
                  <span>{selectedTime} min</span>
                  <button onClick={increaseTime}>+</button>
                </div>
              </div>

              <div className="mobile-trade-buttons">
                <button className="mobile-trade-buy" onClick={() => handleTrade("buy")} disabled={pendingTrade}>
                  BUY
                </button>
                <button className="mobile-trade-sell" onClick={() => handleTrade("sell")} disabled={pendingTrade}>
                  SELL
                </button>
              </div>
            </div>

            <div className="coins-section">
              <h2>Coins to predict</h2>
              <div className="coin-item">
                <img src="/placeholder.svg?height=32&width=32" alt="Bitcoin" className="coin-icon" />
                <span className="coin-name">Bitcoin (BTC)</span>
              </div>
              <button className="add-coin-button">
                + Add coin
                <span className="pro-badge">PRO</span>
              </button>
            </div>

            <PredictionStrategy selectedStrategy={selectedStrategy} onSelectStrategy={setSelectedStrategy} />
          </div>
        ) : (
          // Desktop view
          <>
            <div className="left-sidebar">
              <div className="sidebar-item active">
                <div className="icon">📊</div>
                <div className="label">TRADE</div>
              </div>
              <div className="sidebar-item">
                <div className="icon">❓</div>
                <div className="label">SUPPORT</div>
              </div>
              <div className="sidebar-item">
                <div className="icon">👤</div>
                <div className="label">ACCOUNT</div>
              </div>
              <div className="sidebar-item">
                <div className="icon">🏆</div>
                <div className="label">TOURNAMENTS</div>
              </div>
              <div className="sidebar-item">
                <div className="icon">📈</div>
                <div className="label">MARKET</div>
              </div>
              <div className="sidebar-item">
                <div className="icon">⋯</div>
                <div className="label">MORE</div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="chart-area">
              {/* Trading Pair Info */}
              <div className="trading-pair-info">
                <div className="pair-selector">
                  <div className="selected-pair">
                    <span className="pair-flag">🇺🇸</span>
                    USD/CAD
                    <span className="pair-percentage">40%</span>
                  </div>
                  <div className="pair-dropdown">▼</div>
                </div>

                <div className="chart-time">
                  <div className="current-time">11:31:47 UTC</div>
                  <div className="pair-info-button">ⓘ PAIR INFORMATION</div>
                </div>
              </div>

              {/* Chart Canvas */}
              <div className="chart-container" ref={chartContainerRef}>
                <canvas
                  ref={canvasRef}
                  width={1200}
                  height={600}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                />

                {/* Chart Controls */}
                <div className="chart-controls">
                  <div className="timeframe-selector">
                    <button className={timeFrame === "1m" ? "active" : ""} onClick={() => setTimeFrame("1m")}>
                      1m
                    </button>
                    <button className={timeFrame === "5m" ? "active" : ""} onClick={() => setTimeFrame("5m")}>
                      5m
                    </button>
                    <button className={timeFrame === "15m" ? "active" : ""} onClick={() => setTimeFrame("15m")}>
                      15m
                    </button>
                    <button className={timeFrame === "1h" ? "active" : ""} onClick={() => setTimeFrame("1h")}>
                      1h
                    </button>
                    <button className={timeFrame === "1d" ? "active" : ""} onClick={() => setTimeFrame("1d")}>
                      1d
                    </button>
                  </div>

                  <div className="chart-tools">
                    <button className="tool-button">✏️</button>
                    <button className="tool-button">📊</button>
                    <button className="tool-button">⚙️</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Trading Panel */}
            <div className="right-sidebar">
              <div className="trading-panel">
                <div className="trading-pair-header">
                  <div className="pair-info">
                    <span className="pair-flag">🇺🇸</span>
                    USD/CAD
                  </div>
                  <div className="pair-percentage">40%</div>
                </div>

                <div className="trade-status">
                  <div className="status-indicator">
                    <span className="status-dot"></span>
                    PENDING TRADE
                  </div>
                </div>

                <div className="trade-time-section">
                  <div className="time-label">Time</div>
                  <div className="time-control">
                    <button className="time-button decrease" onClick={decreaseTime}>
                      −
                    </button>
                    <div className="time-display">{selectedTime}</div>
                    <button className="time-button increase" onClick={increaseTime}>
                      +
                    </button>
                  </div>
                </div>

                <div className="investment-section">
                  <div className="investment-label">Investment</div>
                  <div className="investment-control">
                    <button className="investment-button decrease" onClick={decreaseInvestment}>
                      −
                    </button>
                    <div className="investment-display">${investment}</div>
                    <button className="investment-button increase" onClick={increaseInvestment}>
                      +
                    </button>
                  </div>
                  <div className="investment-switch">SWITCH</div>
                </div>

                <div className="trade-buttons">
                  <button className="trade-button buy" onClick={() => handleTrade("buy")} disabled={pendingTrade}>
                    BUY
                  </button>

                  <div className="payout-info">Your payout: {payout} $</div>

                  <button className="trade-button sell" onClick={() => handleTrade("sell")} disabled={pendingTrade}>
                    SELL
                  </button>
                </div>

                <div className="trade-history-section">
                  <div className="history-header">
                    <div className="history-title">Trades</div>
                    <div className="history-count">{tradeHistory.length}</div>
                  </div>

                  {tradeHistory.length === 0 ? (
                    <div className="no-history">
                      You don't have a trade history yet. You can open a trade using the form above.
                    </div>
                  ) : (
                    <div className="history-list">
                      {tradeHistory.map((trade, index) => (
                        <div key={index} className="history-item">
                          <div className="history-time">{trade.time}</div>
                          <div className={`history-direction ${trade.direction}`}>{trade.direction.toUpperCase()}</div>
                          <div className="history-amount">${trade.amount}</div>
                          <div className={`history-profit ${trade.profit >= 0 ? "positive" : "negative"}`}>
                            {trade.profit >= 0 ? "+" : ""}
                            {trade.profit.toFixed(2)}$
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Predict

