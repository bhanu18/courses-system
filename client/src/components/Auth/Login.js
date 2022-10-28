import React, { useState } from "react";
import Axios from 'axios';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token = localStorage.getItem('token');
    const [error, setError] = useState('');
    const [roll, initRole] = useState(false);
    const redirect = useNavigate();

    if (token) {
        //navi('/');

        window.location.href = '/';
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = (e) => {

        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {

            const sendPostRequest = async () => {
                try {
                    const res = await Axios({
                        method: "POST",
                        data: {
                            email: email,
                            password: password
                        },
                        withCredentials: true,
                        url: process.env.REACT_APP_URL + "/auth/login",
                    })

                    if (res.data.success === true) {

                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('user_id', res.data.user_id);
                        localStorage.setItem('user_name', res.data.user_name);
                        localStorage.setItem('role', res.data.role);
                        e.preventDefault();
                        if (localStorage.getItem('role') === 'Instructor') {
                            initRole(true)
                            redirect("/View");
                        }
                        else if (localStorage.getItem('role') === 'Student') {
                            initRole(true)
                            redirect('/');
                        } else if (localStorage.getItem('role') === 'undefined') {
                            e.preventDefault();
                            setError(res.data.msg)
                            initRole(true)
                        } else {
                            e.preventDefault();
                            setError(res.data.msg)
                            // initRole(true);
                            // setInterval(() => {
                            //     initRole(false)
                            // }, '3000');
                        }
                    } else {
                        setError(res.data.msg)
                        e.preventDefault();
                        // initRole(true);
                        // setInterval(() => {
                        //     initRole(false)
                        // }, '3000');
                    }
                    //console.log("try msg" + res.data.success);
                } catch (err) {
                    // Handle Error Here
                    console.error(err);
                    setError(err.message);
                }
            };

            sendPostRequest();
        }

    }

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">

            <MDBRow>

                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="" />
                </MDBCol>

                <MDBCol col='4' md='6'>
                    {error ? <Alert key="danger" variant="danger">
                        {error}
                    </Alert> : ''}
                    <form onSubmit={handleLogin}>

                        <MDBInput wrapperClass='mb-4' label='Email address' id='formControlEmail' type='email' size="lg" onChange={handleEmail} />
                        <MDBInput wrapperClass='mb-4' label='Password' id='formControlPassword' type='password' size="lg" onChange={handlePassword} />

                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
                            {roll ? <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> : ''}
                            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
                        </div>
                    </form>
                </MDBCol>

            </MDBRow>

        </MDBContainer>
    )
}