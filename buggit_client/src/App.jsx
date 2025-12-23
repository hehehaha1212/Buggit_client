import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import AdminDashboard from './pages/Admin'
import {LevelEditor} from './pages/newlevel'
//import ProtectedRoute from './component/ProtectedRoutes'
import Level from './pages/Level'
import NotFound from './pages/NotFound'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/level" element={<Level/>}/>
        <Route path="/new" element={<LevelEditor/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
         <Route
            path="/admin"
            element={
                <AdminDashboard />
            }
          />
           <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App