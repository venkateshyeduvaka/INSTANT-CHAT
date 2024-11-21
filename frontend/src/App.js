
import { Navigate, Route, Routes } from 'react-router-dom';
import {Toaster} from "react-hot-toast"
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from "./pages/SignupPage"
import { useAuthContext } from './context/AuthContext';



function App() {
  const {authUser}=useAuthContext()
  return (
  <div className='p-4 h-screen flex items-center justify-center'>
    <Toaster/>
    <Routes>
      <Route path="/" element={authUser?<HomePage/>:<Navigate to={"/login"}/>}/>
      <Route path="/login" element={authUser?<Navigate to="/"/>:<LoginPage/>}/>
      <Route path="/signup" element={authUser?<Navigate to="/"/>:<SignupPage/>}/>
    </Routes>
  </div>
  );
}

export default App;
