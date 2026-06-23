import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../config/firebase";

export const SignupScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
           const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await setDoc(doc(db, "users", userCredential.user.uid), {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                isAuthenticated: true,
                role: role,
                createdAt: serverTimestamp()
            });

            Cookies.set("isAuthenticated", "true", {
                expires: 7
            });

            Cookies.set("uid", userCredential.user.uid, {
                expires: 7
            });

            Cookies.set("email", userCredential.user.email, {
                expires: 7
            });

            Cookies.set("role", role, {
                expires: 7
            });



            alert("Signup Successful");

            navigate("/" , { replace: true });
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
                      <h3 className="text-center">Signup</h3>

                      <form onSubmit={handleSignup}>
                          <input
                              className="form-control my-2"
                              placeholder="Email"
                              onChange={(e) => setEmail(e.target.value)}
                          />

                          <input
                              type="password"
                              className="form-control my-2"
                              placeholder="Password"
                              onChange={(e) => setPassword(e.target.value)}
                          />

                          <select
                              className="form-control my-2"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                          >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                          </select>

                          <Link to={'/'}>Login</Link>
                          
                          <button className="btn btn-custom w-100 text-white mt-3">
                              Signup
                          </button>
                      </form>
                  </div>
              </div>
          </div>

      </div>
  )
}
