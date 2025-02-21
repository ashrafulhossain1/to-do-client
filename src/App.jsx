import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Authentications/Login";
import Home from "./pages/Home/Home";
import SignUp from './pages/Authentications/SignUp';
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { Toaster } from 'react-hot-toast';
import ProtectLogged from "./ProtectedRoute/ProtectLogged";

function App() {
  return (
    <BrowserRouter>
      <Toaster></Toaster>
      <Routes>
        <Route element={<ProtectLogged></ProtectLogged>}>
          <Route index path="/signIn" element={<Login />} />
        </Route>
        <Route element={<ProtectLogged></ProtectLogged>} >
          <Route index path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute></ProtectedRoute>}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
