import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./component/Login";
import Signup from "./component/Signup";
import Homepage from "./component/Homepage";
import Menu from "./component/Menu";
import { StrictMode } from "react";
import { AuthProvider } from "./hooks/userAuth";
import { CartProvider } from "./hooks/useCart";
import UpdateUser from "./component/UpdateUser";
import Reservation from "./component/Reservation";
import AdminLogin from "./component/Admin/AdminLogin";
import AdminRequestPage from "./component/Admin/AdminRequestPage";
import ReservationHistory from "./component/ReservationHistory";
import FoodSelectionPage from "./component/OrderProcess/FoodSelectionPage";
import CartPage from "./component/OrderProcess/CartPage"
import SubLogin from "./component/SubLogin"
import OrderHistory from "./component/OrderProcess/OrderHistory";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./hooks/userAuth";
function RequireAuth({ children }) {
  const { user } = useAuth();
  return user ? children : <Login />;
}
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sub-login" element={<SubLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/infor" element={<RequireAuth><UpdateUser /></RequireAuth>} />
            <Route path="/reservation" element={<RequireAuth><Reservation /></RequireAuth>}></Route>
            <Route path="/reservationhistory" element={<RequireAuth><ReservationHistory /></RequireAuth>}></Route>
            <Route path="/food-select" element={<RequireAuth><FoodSelectionPage /></RequireAuth>}></Route>
            <Route path="/cart" element={<RequireAuth><CartPage /></RequireAuth>}></Route>
            <Route path="/order-history" element={<RequireAuth><OrderHistory /></RequireAuth>}></Route>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminRequestPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
