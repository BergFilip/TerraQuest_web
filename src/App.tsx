
import './App.scss'
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import {BrowserRouter as Router,Routes, } from "react-router-dom";



function App() {
    return(
        <Router>
            <div className="container">
                <Header></Header>
                <main className="main-container">
                    <Routes>

                    </Routes>
                </main>
                <Footer></Footer>
            </div>
        </Router>
    )
}

export default App
