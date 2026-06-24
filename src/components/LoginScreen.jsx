import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { db, auth } from '../config/firebase'
import { doc, getDoc } from "firebase/firestore";

export const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const isDisabled = true;
    
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const userDoc = await getDoc(
                doc(db, "users", userCredential.user.uid)
            );

            const userData = userDoc.data();

            Cookies.set("role", userData.role, {
                expires: 7
            });

            Cookies.set("isAuthenticated", "true", {
                expires: 7
            });

            Cookies.set("uid", userData.uid, {
                expires: 7
            });

            navigate("/forms", { replace: true });
        } catch (error) {
            alert(error.message)
        }
    };

    useEffect(() => {
        if (Cookies.get("isAuthenticated")) {
            navigate("/forms", { replace: true });
        }
    }, [navigate])

  return (
      <div className="container my-5">
          <div className='row g-3 justify-content-center'>
              <div className='col-12 col-md-6'>
                  <div className="card p-4 shadow">
                      <h3 className="text-center">Login</h3>

                      <form onSubmit={handleLogin}>
                          <input
                              className="form-control my-2"
                              placeholder="Email"
                            value={email}
                              onChange={(e) => setEmail(e.target.value)}
                          />

                          <input
                              type="password"
                              className="form-control my-2"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                          />
                          <Link style={{
                              pointerEvents: isDisabled ? "none" : "auto",
                              color: isDisabled ? "gray" : "blue",
                              cursor: isDisabled ? "not-allowed" : "pointer",
                          }} to={'/signup'}>Signup</Link>
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
