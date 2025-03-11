import './App.scss'
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import {BrowserRouter as Router,Routes, Route, } from "react-router-dom";
import PrivacyPolicies from "./sites/Privacy_policy.tsx";


function App() {
    return(
        <Router>
            <div className="container">
                <Header></Header>
                <main className="main-container">
                    <Routes>
                        <Route path="/privacypolicies" element={<PrivacyPolicies/>}/>
                    </Routes>
                </main>
                <Footer></Footer>
            </div>
        </Router>
    )
}

export default App
