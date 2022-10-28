// import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
import { Login } from "./components/Auth/Login";
import { Home } from "./components/Home";
import { Register } from "./components/Auth/Register";
import { ViewCourses } from "./components/Admin/ViewCourses";
import { AddCourses } from './components/Admin/AddCourse';

const App = () => {

    const token = localStorage.getItem('token');

    if (!token) {
        const regURL = window.location.pathname;
        if(regURL ===  '/register'){
            return <Register />;
        }else{
            return <Login />
        }
    }

    return (
        <>
                <Routes >
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/View" element={<ViewCourses />} />
                    <Route path="/Add" element={<AddCourses />} />
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: "1rem" }}>
                                <p>There's nothing here!</p>
                            </main>
                        }
                    />
                </Routes >
        </>
    )
}

export default App;