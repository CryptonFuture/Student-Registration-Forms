import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'

export const ScreenForm = () => {
  return (
    <div className="container my-5">
      <div className="card shadow-lg p-5 text-center success-card">
        
        <h1 style={{ color: "#1a433a", fontWeight: "bold" }}>
          🎉 Successfully Submitted!
        </h1>

        <p className="mt-3 text-muted">
          Student information has been saved successfully.
        </p>

        <Link to={"/forms"} className="btn btn-custom mt-4 text-white">
          Go Back
        </Link>

      </div>
    </div>
  )
}
