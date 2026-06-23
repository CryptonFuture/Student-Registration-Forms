import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudentFomrs } from "../components/StudentFomrs";
import { ScreenForm } from "../components/ScreenForm";
import { LoginScreen } from "../components/LoginScreen";
import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import { SignupScreen } from "../components/SignupScreen";


export const Routers = () => {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PublicRoute>
              <LoginScreen />
          </PublicRoute>} 
        />

        <Route path="/signup" element={
          <PublicRoute>
              <SignupScreen />
          </PublicRoute>} 
        />

        <Route path="/forms" element={
          <ProtectedRoute>
              <StudentFomrs />
          </ProtectedRoute>} />
          
        <Route path="/success" element={
          <ProtectedRoute>
              <ScreenForm />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
