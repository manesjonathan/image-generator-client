import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import ImagePrompt from "./pages/ImagePrompt";
import PrivateRoute from "./config/PrivateRoute";
import Header from "./components/Header";

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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
