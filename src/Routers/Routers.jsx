import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudentFomrs } from "../components/StudentFomrs";
import { ScreenForm } from "../components/ScreenForm";
import { LoginScreen } from "../components/LoginScreen";
import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";


export const Routers = () => {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PublicRoute>
              <LoginScreen />
          </PublicRoute>} 
        />
        <Route path="/forms" element={
          <ProtectedRoute>
              <StudentFomrs />
          </ProtectedRoute>} />
        <Route path="/success" element={<ScreenForm />} />
      </Routes>
    </BrowserRouter>
  )
}
