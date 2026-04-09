import { Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { FolderPage } from "./pages/FolderPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";

export default function App(){
    return(
        <Routes>
            <Route path="/dashboard" element={<ProtectedRoute> <Dashboard/></ProtectedRoute>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/folder/:id" element={<ProtectedRoute><FolderPage/></ProtectedRoute>}/>
        </Routes>
    );
}