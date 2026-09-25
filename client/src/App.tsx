import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import LoginPage from "./pages/LoginPage";
import MyRentalsPage from "./pages/MyRentalsPage";
import BookingDetailsPage from "./pages/BookingDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/items/:id" element={<ItemDetailsPage />} />
          <Route path="/my-rentals" element={<MyRentalsPage />} />
          <Route path="/bookings/:id" element={<BookingDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;