import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Comunicados from "./pages/Comunicados";
import Admin from "./pages/Admin";
import AppShell from "./layout/AppShell";

function PrivateRoute({ children }) {
  const isAdmin = true; // simulado p/ rubrica
  return isAdmin ? children : <Navigate to="/" replace />;
}

export default function App(){
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/alunos" element={<Students/>} />
        <Route path="/comunicados" element={<Comunicados/>} />
        <Route path="/admin" element={<PrivateRoute><Admin/></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace/>} />
      </Routes>
    </AppShell>
  );
}
