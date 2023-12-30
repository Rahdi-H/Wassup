import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword';
import NewPassword from './pages/NewPassword';
import Test from './pages/Test';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />
        <Route path='/new-password' element={<NewPassword/>} />
        <Route path='/test' element={<Test/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;