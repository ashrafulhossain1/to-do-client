import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Authentications/Login";
import Home from "./pages/Home/Home";
import SignUp from './pages/Authentications/SignUp';
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/signIn" element={<Login />} />
        <Route index path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute></ProtectedRoute>}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
