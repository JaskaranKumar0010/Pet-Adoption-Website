import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import bg from './img/images/contact_img.png'
import './styles/Login.css';
import { signup } from "../API/endpoint";

const Signup = () => {

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        userName: "",
        email: "",
        password: "",
    });

    const notify = toast

    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.userName.trim()) {
            newErrors.userName = "Username is required";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is Required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid Email";
        }
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Confirm Password is required";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            Object.values(newErrors).forEach(error => {
                toast.error(error); // Display error as toast notification
            });
            return;
        }
        try {
            const res = await signup(formData);
            if (res.status === 200) {
                toast.success('Signup Successful');
                navigate('/login');
            } else if (res.status === 204) {
                toast.error("User already exist"); 
            } else if (res.status === 201) {
                toast.error('Passwords do not match');
            }
             else if (res.status === 500) {
                toast.error('Interval Server Error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlealreadyloginClick = () => {
        navigate('/login')
    }

    const setShowPassword = () => {
        var x = document.getElementById("password");
        var y = document.getElementById("confirmPassword");
        if ((x.type && y.type) === "password") {
            x.type = "text";
            y.type = "text";
        } else {
            x.type = "password";
            y.type = "password";
        }
    };

    const handleInputChange = (e) => {
        setErrors({ ...errors, [e.target.name]: '' });
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };




    return (
        <>
            <div className="loginform">
                <div className="logincontainer">
                    <div className="loginmain">
                        <ToastContainer />
                        <div className="logincontent" >
                            <h2>SignUp</h2>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="userName"
                                    placeholder="Full Name"
                                    value={formData.userName}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="E-mail"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="password"
                                    id='password'
                                    name="password"
                                    placeholder="Enter Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="password"
                                    id='confirmPassword'
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}

                                />
                                <button className="loginbtn" type="submit">Sign Up
                                </button>
                                <div className="showpassword">
                                    <input type="checkbox" onClick={() => setShowPassword()} /> Show Password
                                </div>
                            </form>
                            <p className="loginaccount" onClick={handlealreadyloginClick}>
                                Already Have An Account? <a href="#">Log In</a>
                            </p>
                        </div>
                        <div className="loginformimg">
                            <img src={bg} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
