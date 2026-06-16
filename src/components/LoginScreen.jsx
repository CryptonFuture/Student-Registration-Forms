import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

export const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === "admin" && password === "admin123") {
            localStorage.setItem("role", "admin");
            navigate("/forms");
        }
        else if (username === "user" && password === "user123") {
            localStorage.setItem("role", "user");
            navigate("/forms");
        }
        else {
            alert("Invalid credentials");
        }
    };

  return (
      <div className="container my-5">
          <div className='row g-3 justify-content-center'>
              <div className='col-12 col-md-6'>
                  <div className="card p-4 shadow">
                      <h3 className="text-center">Login</h3>

                      <form onSubmit={handleLogin}>
                          <input
                              className="form-control my-2"
                              placeholder="Username"
                              onChange={(e) => setUsername(e.target.value)}
                          />

                          <input
                              type="password"
                              className="form-control my-2"
                              placeholder="Password"
                              onChange={(e) => setPassword(e.target.value)}
                          />

                          <button className="btn btn-custom w-100 text-white mt-3">
                              Login
                          </button>
                      </form>
                  </div>
              </div>
          </div>

      </div>
  )
}
