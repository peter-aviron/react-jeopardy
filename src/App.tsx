import "./App.css";
import React from 'react'
import JeopardyApp from "./components/Jeopardy/JeopardyApp";
import { Route, Routes } from "react-router-dom";
import PhotosApp from "./components/PhotosApp";
import Landing from "./components/Landing";
import ToDoApp from "./components/ToDoApp";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="jeopardy" element={<JeopardyApp />} />
            <Route path="toDo" element={<ToDoApp />} />
            <Route path="photos" element={<PhotosApp />} />
        </Routes>
    )
}

export default App;