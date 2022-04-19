import React, { useContext, useState } from 'react'
import cssModules from '../components/css/Login.module.css'
import logoDumbmerch from '../components/assets/Frame.png'
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from '../config/api';
import { Alert } from 'react-bootstrap';
import { UserContext } from '../context/userContext'

function Login() {

    const navigate = useNavigate();

    document.title = `Dumbmerch | Login`

    const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const { email, password } = form;

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = useMutation(async (e) => {
        try {
          e.preventDefault();
      
          // Configuration Content-type
          const config = {
            headers: {
              'Content-type': 'application/json',
            },
          };
      
          // Data body
          const body = JSON.stringify(form);
      
          // Insert data user to database
          const response = await API.post('/login', body, config);

          const alert = (
            <Alert variant="success" className="py-1">
              Login Success!
            </Alert>
          );
          setMessage(alert);
          console.log(response.data.data);

          const user = response.data.data.user;

          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: user
          });

          if(user.status == 'admin'){
              navigate('/list-product')
          } else {
              navigate('/homepage')
          }
      
          // Handling response here
        } catch (error) {
          const alert = (
            <Alert variant="danger" className="py-1">
              Login Failed!
            </Alert>
          );
          setMessage(alert);
          console.log(error);
        }
    });

    return (
        <div className={cssModules.mainContainer}>

            <div className={cssModules.container}>

                <div className={cssModules.leftSide}>
                    <img src={logoDumbmerch} alt="Logo Dumbmerch" />
                    <h1>Easy, Fast and Reliable</h1>
                    <p>Go shopping for merchandise, just go to dumb merch shopping. the biggest merchandise in <span>Indonesia</span></p>

                    <div className={cssModules.btnGrp}>
                        <Link to="/login" className={cssModules.btnLogin}>Login</Link>
                        <Link to="/register" className={cssModules.btnReg}>Register</Link>
                    </div>

                </div>

                <div className={cssModules.rightSide}>
                    <div className={cssModules.rightContainer}>
                        <h2>Login</h2>
                        <form onSubmit={(e) => handleSubmit.mutate(e)}>
                            <input type="email" onChange={handleChange} value={email} id='email' name='email' placeholder='Email' />
                            <input type="password" onChange={handleChange} value={password} id='password' name='password' placeholder='Password' />
                            <button type='submit'>Login</button>
                        </form>
                        {message && message}
                    </div>
                </div>

            </div>



        </div>
    )
}

export default Login;