import './App.scss'
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import {BrowserRouter as Router,Routes, Route, } from "react-router-dom";
import Newsletter from "../src/sites/Newsletter.tsx";
import About from "../src/sites/About.tsx";


function App() {
    return(
        <Router>
            <div className="container">

                <main className="main-container">
                    <Routes>
                        <Route path="/newsletter" element={<Newsletter/>}/>
                        <Route path="/About" element={<About/>}/>
                    </Routes>
                </main>

            </div>
        </Router>
    )
}

export default App
