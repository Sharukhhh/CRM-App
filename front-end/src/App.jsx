import react from 'react';
import {Routes, Route} from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import PrivatePages from './components/PrivatePages';
import Contacts from './Pages/Contacts';
import Users from './Pages/Users';

function App() {

  return (
    <>
    <Toaster position='top-right'/>
        <Routes>

            <Route path='/' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>

            <Route element={<PrivatePages/>}>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/contacts' element={<Contacts/>}/>
              <Route path='/users' element={<Users/>}/>
            </Route>

        </Routes>
    </>
  )
}

export default App
