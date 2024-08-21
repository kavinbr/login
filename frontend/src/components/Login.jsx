// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// function Login() {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const { login } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         // Check for admin credentials
//         if (formData.email === 'admin@email.com' && formData.password === 'Admin@123') {
//             try {
//                 const response = await axios.post('https://loginsignup-ht65.onrender.com/api/auth/admin-login', formData);
//                 const { token, user } = response.data;
                
//                 localStorage.setItem('token', token); // Store the token in localStorage
//                 login(user, token); // Log the user in using the context
//                 navigate('/admin-dashboard');
//             } catch (error) {
//                 console.error('Login failed', error);
//                 alert('Login failed. Please check your email and password.');
//             }
//         } else {
//             try {
//                 const response = await axios.post('https://loginsignup-ht65.onrender.com/api/auth/login', formData);
//                 const { user, token } = response.data;

//                 localStorage.setItem('token', token); // Store the token in localStorage
//                 login(user, token); // Log the user in using the context
//                 navigate('/profile');
//             } catch (error) {
//                 console.error('Login failed', error);
//                 alert('Login failed. Please check your email and password.');
//             }
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input 
//                     type="email" 
//                     name="email" 
//                     placeholder="Email" 
//                     value={formData.email} 
//                     onChange={handleChange} 
//                     required 
//                 />
//                 <input 
//                     type="password" 
//                     name="password" 
//                     placeholder="Password" 
//                     value={formData.password} 
//                     onChange={handleChange} 
//                     required 
//                 />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// }

// export default Login;
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check for admin credentials
        if (formData.email === 'admin@email.com' && formData.password === 'Admin@123') {
            try {
                const response = await axios.post('https://loginsignup-ht65.onrender.com/api/auth/admin-login', formData);
                const { token, user } = response.data;
                
                localStorage.setItem('token', token); // Store the token in localStorage
                login(user, token); // Log the user in using the context
                navigate('/admin-dashboard');
            } catch (error) {
                console.error('Login failed', error);
                alert('Login failed. Please check your email and password.');
            }
        } else {
            try {
                const response = await axios.post('https://loginsignup-ht65.onrender.com/api/auth/login', formData);
                const { user, token } = response.data;

                localStorage.setItem('token', token); // Store the token in localStorage
                login(user, token); // Log the user in using the context
                navigate('/profile');
            } catch (error) {
                console.error('Login failed', error);
                alert('Login failed. Please check your email and password.');
            }
        }
    };

    const handleSignUpClick = () => {
        navigate('/signup'); // Navigate to the sign-up page
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="form-control"
                            required 
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            className="form-control"
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
                </form>
                <button onClick={handleSignUpClick} className="btn btn-link w-100 text-center">
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default Login;

