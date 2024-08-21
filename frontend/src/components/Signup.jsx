


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Signup() {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '', gender: '' });
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const validateForm = () => {
//         const newErrors = {};

//         if (!formData.name) newErrors.name = 'Name is required';
//         if (!formData.email) newErrors.email = 'Email is required';
//         if (!formData.password) {
//             newErrors.password = 'Password is required';
//         } else {
//             const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//             if (!passwordRegex.test(formData.password)) {
//                 newErrors.password = 'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character';
//             }
//         }
//         if (!formData.gender) newErrors.gender = 'Gender is required';

//         return newErrors;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const validationErrors = validateForm();
//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             return;
//         }

//         try {
//             await axios.post('http://localhost:5000/api/auth/signup', formData);
//             navigate('/login');
//         } catch (error) {
//             if (error.response && error.response.data.message) {
//                 setErrors({ form: error.response.data.message });
//             } else {
//                 console.error('Signup failed', error);
//             }
//         }
//     };

//     return (
//         <div>
//             <h2>Sign Up</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="Name"
//                         value={formData.name}
//                         onChange={handleChange}
//                     />
//                     {errors.name && <p>{errors.name}</p>}
//                 </div>
//                 <div>
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         value={formData.email}
//                         onChange={handleChange}
//                     />
//                     {errors.email && <p>{errors.email}</p>}
//                 </div>
//                 <div>
//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         value={formData.password}
//                         onChange={handleChange}
//                     />
//                     {errors.password && <p>{errors.password}</p>}
//                 </div>
//                 <div>
//                     <select
//                         name="gender"
//                         value={formData.gender}
//                         onChange={handleChange}
//                     >
//                         <option value="">Select Gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                     </select>
//                     {errors.gender && <p>{errors.gender}</p>}
//                 </div>
//                 {errors.form && <p>{errors.form}</p>}
//                 <button type="submit">Sign Up</button>
//                 <button type="button" onClick={() => navigate('/login')}>
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default Signup;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', gender: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(formData.password)) {
                newErrors.password = 'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character';
            }
        }
        if (!formData.gender) newErrors.gender = 'Gender is required';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.post('https://loginsignup-ht65.onrender.com/api/auth/signup', formData);
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrors({ form: error.response.data.message });
            } else {
                console.error('Signup failed', error);
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                    </div>
                    {errors.form && <div className="alert alert-danger">{errors.form}</div>}
                    <button type="submit" className="btn btn-primary w-100 mb-3">Sign Up</button>
                    <button type="button" className="btn btn-link w-100 text-center" onClick={() => navigate('/login')}>
                        Already have an account? Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
