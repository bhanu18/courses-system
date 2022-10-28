import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import Axios from 'axios';
// import Modal from 'react-bootstrap/Modal';
// import { AddCourses } from "../Admin/AddCourse";
// import './Navs.css';

export const Navs = () => {

  const navi = useNavigate();

  const user_role = localStorage.getItem('role');

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    Axios({
      method: "GET",
      withCredentials: true,
      url: process.env.REACT_APP_URL + "/auth/logout",
    }).then((res) => console.log(res));
    navi("/login");


  }

  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container>
      {user_role === "Instructor" ? 
      <Nav className="justify-content-end navigation-menu" activeKey="/home">
          <Nav.Item>
            <Nav.Link href="/View">View Courses</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/Add">Add Courses</Nav.Link>
          </Nav.Item>
          <Nav.Item>
             <Button variant="danger" onClickCapture={logout}>Logout</Button>{' '}
           </Nav.Item>
        </Nav>
           : <Nav className="justify-content-end navigation-menu" activeKey="/home">
           <Nav.Item>
             <Nav.Link href="/home">Home</Nav.Link>
           </Nav.Item>
           <Nav.Item>
             <Button variant="danger" onClickCapture={logout}>Logout</Button>{' '}
           </Nav.Item>
         </Nav>
          }
      </Container>
    </Navbar >
    
    {/* <Modal show={show} onHide={handleClose}  size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCourses />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  )
}