import './App.css';
import {BrowserRouter, Routes , Route}  from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Logout from './pages/Logout';
import User from './pages/User'; // user details/edit/delete
import Post from './pages/Post'; // post create/edit/delete
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import SinglePost from './pages/SinglePost';

function App() {
  return (
    <BrowserRouter>
    <>
    <Navbar/>
    <hr/>
    </>
     <Routes>
     
      <Route path='/' element ={<PrivateRoute><Home/></PrivateRoute>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/logout' element={ <PrivateRoute><Logout/></PrivateRoute>}/>
      <Route path='/user-detail' element={<PrivateRoute><User/></PrivateRoute>}/>
      <Route path ='/post-detail/:id' element={<PrivateRoute><SinglePost/></PrivateRoute>}/>
      <Route path="/post-detail" element={<Post />} />

      <Route/>
     </Routes>
    </BrowserRouter>
   
  );
}

export default App;
