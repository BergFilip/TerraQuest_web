import './App.scss'
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Home from "./sites/Home.tsx";
import PrivacyPolicies from "./sites/Privacy_policy.tsx";
import Newsletter from "./sites/Newsletter.tsx";
import About from "./sites/About.tsx";
import Error from "./sites/Error.tsx";
import Product from "./sites/Product.tsx";
import Help from "./sites/Help.tsx";
import User from "./sites/User.tsx";
import Contact from "./sites/Contact.tsx";
import Login from "./sites/Login.tsx";
import Register from "./sites/Registration.tsx";
import Weather from "./sites/Weather.tsx";
import Explore from "./sites/Explore.tsx";
import Search from "./sites/Search.tsx";

function App() {
    return (
        <div className="container">
            <main className="main-container">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/privacypolicies" element={<PrivacyPolicies />} />
                    <Route path="/newsletter" element={<Newsletter />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/product/:hotelId" element={<Product />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/search" element={<Search />} />

                    <Route path="*" element={<Navigate to="/error" />} />
                    <Route path="/error" element={<Error />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
