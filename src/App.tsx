import "./App.css";
import React from 'react'
import JeopardyApp from "./components/JeopardyApp";
import { Route, Routes } from "react-router-dom";
import PhotosApp from "./components/PhotosApp";

function App() {
    return (
        <Routes>
            <Route path="/" element={<JeopardyApp />} />
            <Route path="about" element={<>Testing</>} />
            <Route path="photos" element={<PhotosApp />} />
        </Routes>
    )
}

export default App;