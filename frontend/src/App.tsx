import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ChatPage from './pages/ChatPage'
import DashboardPage from './pages/DashboardPage'
import './styles/page.css'
import './index.css'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<ChatPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
