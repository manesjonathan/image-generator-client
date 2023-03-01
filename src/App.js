import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import ImagePrompt from "./pages/ImagePrompt";
import PrivateRoute from "./config/PrivateRoute";
import Navbar from "./components/Navbar";
import ImageGallery from "./pages/ImageGallery";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/payment" element={
                    <PrivateRoute>
                        <Navbar/>
                        <Payment/>
                    </PrivateRoute>
                }/>
                <Route path="/generate" element={
                    <PrivateRoute>
                        <Navbar/>
                        <ImagePrompt/>
                    </PrivateRoute>
                }/>
                <Route path="/gallery" element={
                    <PrivateRoute>
                        <Navbar/>
                        <ImageGallery/>
                    </PrivateRoute>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
