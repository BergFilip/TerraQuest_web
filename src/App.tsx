import './App.scss'
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Home from "./sites/Home.tsx";
import PrivacyPolicies from "./sites/Privacy_policy.tsx";
import Newsletter from "../src/sites/Newsletter.tsx";
import About from "../src/sites/About.tsx";
import Error from "./sites/Error.tsx"
import Product from "./sites/Product.tsx";
import Help from "./sites/Help.tsx";
import User from "./sites/User.tsx";
import Contact from "./sites/Contact.tsx";
import Login from "./sites/Login.tsx";


function App() {
    return(
        <Router>
            <div className="container">
                <Header></Header>
                <main className="main-container">
                    <Routes>

                        <Route path="/" element={<Home/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/privacypolicies" element={<PrivacyPolicies/>}/>
                        <Route path="/newsletter" element={<Newsletter/>}/>
                        <Route path="/About" element={<About/>}/>
                        <Route path="*" element={<Navigate to="/error"/>}/>
                        <Route path="/error" element={<Error/>}/>
                        <Route path="/product" element={<Product/>}/>
                        <Route path="/help" element={<Help/>}/>
                        <Route path="/user" element={<User/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </main>
                <Footer></Footer>
            </div>
        </Router>
    )
}
export default App

