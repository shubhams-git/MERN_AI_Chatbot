import { Route, Routes } from 'react-router'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Chat from './pages/Chat'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
function App() {
  return <div>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='*' element={<div>Not Found</div>} />
    </Routes>
  </div>
}

export default App
