import { Routes, Route,Navigate } from "react-router-dom";

export default function AppRoutes() {
    return (
        <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<div className="flex w-full items-center justify-center">Dashboard Page</div>} />
        </Routes>
    );
    }