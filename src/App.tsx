import './App.scss'
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import {BrowserRouter as Router,Routes, Route, } from "react-router-dom";
import User from "./sites/User.tsx";


function App() {
    return(
        <Router>
            <div className="container">
                <main className="main-container">
                    <Header></Header>

                    <Routes>
                        <Route path="/user" element={<User/>}/>
                    </Routes>
                </main>
                <Footer></Footer>
            </div>
        </Router>
    )
}

export default App
