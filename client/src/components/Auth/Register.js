import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './Register.css';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBRow,
    MDBCol,
}
    from 'mdb-react-ui-kit';

import Axios from 'axios';

export const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [roll , initRole] = useState(false);

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleRole = (e) => {
        setRole(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleRegistration = (e) => {

        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {

            const registering = async () => {

                try {
                    const res = await Axios({
                        method: "POST",
                        data: {
                            email: email,
                            password: password,
                            name: name,
                            role: role
                        },
                        withCredentials: true,
                        url: process.env.REACT_APP_URL + "/auth/register",
                    });

                    if (res.data === 'User exist') {
                        setError(res.data);
                        e.preventDefault();
                        initRole(true)
                    } else {
                        initRole(true);
                        window.location.href = '/login';
                    }
                    //console.log(res);

                } catch (error) {

                    setError(error.message);
                    console.log(error)
                }
            }
            registering();
        }
    }

    return (
        <Container>

            <MDBContainer fluid className='my-5'>

                <MDBRow className='g-0 align-items-center'>
                    {error ? <Alert variant="danger" dismissible>
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        <p>
                            {error}
                        </p>
                    </Alert> : ''}

                    <MDBCol col='6' sm={12} md={6}>

                        <MDBCard className='my-5 cascading-right' style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)' }}>
                            <MDBCardBody className='p-5 shadow-5 text-center'>

                                <h2 className="fw-bold mb-5">Sign up now</h2>
                                <form onSubmit={handleRegistration}>

                                    <MDBRow>
                                        <MDBCol col='12'>
                                            <MDBInput wrapperClass='mb-4' label='Name' id='form1' required type='text' onChange={handleName} />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol col='12' className='mb-4'>
                                            <Form.Select aria-label="Default select example" required className="mb-3" onChange={handleRole}>
                                                <option>Open this select menu</option>
                                                <option value="Student">Student</option>
                                                <option value="Instructor">Instructor</option>
                                            </Form.Select>
                                        </MDBCol>
                                    </MDBRow>
                                    <p>Role</p>
                                    <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' required onChange={handleEmail} />
                                    <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' required onChange={handlePassword} />

                                    <MDBBtn className='w-100 mb-4' size='md'>sign up</MDBBtn>
                                    {roll ? <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>: ''}

                                </form>

                                <p className="small fw-bold mt-2 pt-1 mb-2">Have an account? <a href="/login" className="link-danger">Login</a></p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol col='6' sm={12} md={6}>
                        <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" className="w-100 rounded-4 shadow-4"
                            alt="" fluid />
                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        </Container>
    )
}