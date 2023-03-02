import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import ImagePrompt from "./pages/ImagePrompt";
import PrivateRoute from "./config/PrivateRoute";
import Navbar from "./components/Navbar";
import ImageGallery from "./pages/ImageGallery";
import Signup from "./pages/Signup";
import Refill from "./pages/Refill";
import ImageFullScreen from "./components/ImageFullScreen";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/refill" element={
                    <PrivateRoute>
                        <Navbar/>
                        <Refill/>
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
                <Route path={`/view/:id`} element={
                    <PrivateRoute>
                        <Navbar/>
                        <ImageFullScreen/>
                    </PrivateRoute>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
