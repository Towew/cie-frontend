import './App.css';
import { useContext, useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { UserContext } from './context/userContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Homepage from './pages/Homepage';
import EditCategory from './pages/EditCategory';
import DetailProduct from './pages/DetailProduct';
import EditProduct from './pages/EditProduct';
import ListCategory from './pages/ListCategory';
import ListProduct from './pages/ListProduct';
import AdminComplain from './pages/AdminComplain';
import UserComplain from './pages/UserComplain';
import AdminAddProduct from './pages/AdminAddProduct';

import { API, setAuthToken } from './config/api';
import AdminAddCategory from './pages/AdminAddCategory';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}


function App() {

  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin == false) {
      navigate('/login');
    } else {
      if (state.user.status == 'admin') {
        navigate('/list-product');
      } else if (state.user.status == 'customer') {
        navigate('/homepage');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
  
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }
  
      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;
  
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    checkUser();
  }, []);

  return (

    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/homepage" element={<Homepage />} />
      <Route exact path="/edit-category/:id" element={<EditCategory />} />
      <Route exact path="/detail-product/:id" element={<DetailProduct />} />
      <Route exact path="/edit-product/:id" element={<EditProduct />} />
      <Route exact path="/list-category" element={<ListCategory />} />
      <Route exact path="/list-product" element={<ListProduct />} />
      <Route exact path="/admin-complaint" element={<AdminComplain />} />
      <Route exact path="/user-complaint" element={<UserComplain />} />
      <Route exact path="/add-product" element={<AdminAddProduct />} />
      <Route exact path="/add-category" element={<AdminAddCategory />} />
    </Routes>
  );
}

export default App;
