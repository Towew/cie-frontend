import React, { useContext, useState } from 'react'
import cssModules from '../components/css/Register.module.css'
import logoDumbmerch from '../components/assets/Frame.png'
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from '../config/api';
import { Alert } from 'react-bootstrap';
import { UserContext } from '../context/userContext';


function Register() {

    const navigate = useNavigate();

    document.title = `Dumbmerch | Register`

    const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = form;

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
          const response = await API.post('/register', body, config);

          const alert = (
            <Alert variant="success" className="py-1">
              Register Success
            </Alert>
          );
          setMessage(alert);
          console.log(response.data.data);
      
          // Handling response here
        } catch (error) {
          const alert = (
            <Alert variant="danger" className="py-1">
              Register Failed
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
                        <Link className={cssModules.btnLogin} to="/login">Login</Link>
                        <Link className={cssModules.btnReg} to="/register">Register</Link>
                    </div>

                </div>

                <div className={cssModules.rightSide}>
                    <div className={cssModules.rightContainer}>
                        <h2>Register</h2>
                        <form onSubmit={(e) => handleSubmit.mutate(e)}>
                            <input type="text" id='name' onChange={handleChange} value={name} name='name' placeholder='Name' />
                            <input type="email" id='email' onChange={handleChange} value={email} name='email' placeholder='Email' />
                            <input type="password" id='password' onChange={handleChange} value={password} name='password' placeholder='Password min.8 Char' />
                            <button type='submit'>Register</button>
                        </form>
                        {message && message}
                    </div>
                </div>

            </div>



        </div>
    )
}

export default Register;