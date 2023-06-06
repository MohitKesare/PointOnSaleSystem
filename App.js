// import logo from "./logo.svg";
// import "./App.css";
import "antd/dist/reset.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ItemPage from "./pages/ItemPage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Bills from "../../models/billsModel";
import BillsPage from "./pages/BillsPage";
import CustomerPage from "./pages/CustomerPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Homepage />
              </>
            }
          />
          <Route path="/items" element={<ItemPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/bills" element={<BillsPage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// export function ProtectedRoute({ children }) {
//   if (localStorage.getItem("auth")) {
//     return children;
//   } else {
//     return;
//     <Navigate to="/login" />;
//   }
// }
