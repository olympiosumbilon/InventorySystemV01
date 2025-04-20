import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/login'
import SignUp from './pages/SignUp/SignUp'
import Dashboard from './pages/Dashboard/DashboardPage'
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>    
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
  )
}

export default App
