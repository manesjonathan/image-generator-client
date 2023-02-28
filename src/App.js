import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import ImagePrompt from "./pages/ImagePrompt";
import PrivateRoute from "./config/PrivateRoute";
import Header from "./components/Header";
import ImageGallery from "./pages/ImageGallery";
import Signup from "./pages/Signup";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/generate" element={
                    <PrivateRoute>
                        <Header/>
                        <ImagePrompt/>
                    </PrivateRoute>
                }/>
                <Route path="/gallery" element={
                    <PrivateRoute>
                        <Header/>
                        <ImageGallery/>
                    </PrivateRoute>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
