
import './App.scss'
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./sites/Home.tsx";



function App() {
    return(
        <Router>
            <div className="container">
                <Header></Header>
                <main className="main-container">
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/home" element={<Home/>} />
                    </Routes>
                </main>
                <Footer></Footer>
            </div>
        </Router>
    )
}

export default App
