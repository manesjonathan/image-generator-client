import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import ImagePrompt from "./pages/ImagePrompt";
import PrivateRoute from "./config/PrivateRoute";
import Header from "./components/Header";
import Gallery from "./pages/Gallery";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <Header/>
                        <ImagePrompt/>
                    </PrivateRoute>
                }/>
                <Route path="/gallery" element={
                    <PrivateRoute>
                        <Header/>
                        <Gallery/>
                    </PrivateRoute>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
