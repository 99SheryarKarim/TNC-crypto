"use client"
import "./JoinUs.css"

function JoinUs() {
  return (
    <div className="join-container">
      <div className="join-content">
        <h1 className="join-heading">
          Join TNC Crypto and
          <br />
          Shape Your Financial Future
        </h1>
        <button className="join-button" onClick={() => (window.location.href = "/signup")}>
          Join Today
        </button>
      </div>
    </div>
  )
}

export default JoinUs

