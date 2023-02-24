import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import ImagePrompt from "./pages/ImagePrompt";

function App() {
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/dashboard" element={<ImagePrompt/>}></Route>
        </Routes>
    </BrowserRouter>)
}

export default App;
