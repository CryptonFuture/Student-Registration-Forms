import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudentFomrs } from "../components/StudentFomrs";
import { ScreenForm } from "../components/ScreenForm";
import { LoginScreen } from "../components/LoginScreen";


export const Routers = () => {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/forms" element={<StudentFomrs />} />
        <Route path="/success" element={<ScreenForm />} />
      </Routes>
    </BrowserRouter>
  )
}
