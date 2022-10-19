import "./App.css";
import React from 'react'
import JeopardyApp from "./components/JeopardyApp";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<JeopardyApp />} />
            <Route path="about" element={<>Testing</>} />
            <Route path="about" element={<>Testing</>} />

            <Route path="about" element={<>Testing</>} />

            <Route path="about" element={<>Testing</>} />

            <Route path="about" element={<>Testing</>} />

        </Routes>
    )
}

export default App;

