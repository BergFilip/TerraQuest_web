import './App.scss'
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import Error from "./sites/Error.tsx"
import {BrowserRouter as Router,Routes, Route, } from "react-router-dom";



function App() {
    return(
        <Router>
            <div className="container">
                <Header></Header>
                <main className="main-container">
                    <Routes>
                        <Route path="/error" element={<Error/>}/>
                    </Routes>
                </main>
                <Footer></Footer>
            </div>
        </Router>
    )
}

export default App
