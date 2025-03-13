import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./component/Login";
import Signup from "./component/Signup";
import Homepage from "./component/Homepage";
import Menu from "./component/Menu";
import { StrictMode } from "react";
import { AuthProvider } from "./hooks/userAuth";
import UpdateUser from "./component/UpdateUser";
import Reservation from "./component/Reservation";
import AdminLogin from "./component/Admin/AdminLogin";
import AdminRequestPage from "./component/Admin/AdminRequestPage";
import ReservationHistory from "./component/ReservationHistory";
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/infor" element={<UpdateUser />} />
          <Route path="/reservation" element={<Reservation />}></Route>
          <Route path="/reservationhistory" element={<ReservationHistory />}></Route>
          {/* <Route path="/reservation" element={<Reservation />}></Route> */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminRequestPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
