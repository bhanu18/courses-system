import React from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Courses } from "../Courses";
import { Navs } from '../Navs/Navs';
import { useState, useEffect } from "react";
import Axios from 'axios';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export const ViewCourses = (props) => {

    const [courses, setCourses] = useState([]);

    const role = localStorage.getItem('role');

    const user = localStorage.getItem('user_name');

    const [val, setVal] = useState();


    const sendGetRequest = async () => {
        try {
            const resp = await Axios.get(process.env.REACT_APP_URL + "/courses");
            setCourses(resp.data);
           console.log(resp.data);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    const handleSearch = (e) => {
        setVal(e.target.value);
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        const getfilter = async () => {
            try {
                const res = await Axios.get(process.env.REACT_APP_URL + '/courses/get?title=' + val);
                setCourses([]);
                setCourses(res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getfilter();
    }

    useEffect(() => {
        sendGetRequest();
    }, [])

    if (role === 'Student') {
        window.location.href = '/'
    }

    return (
        <>
            <Navs />
            <Container className="mt-5">
                <div className="bg-light p-5 mb-5">
                    <h3>Welcome, {user}</h3>
                </div>
                <Row>
                    <Col md="4" className="mb-3">
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                             <Form.Control type="text" placeholder="Search title here" onChange={handleSearch} />
                                </Col>
                                <Col>
                            <Button variant="primary" type="submit"> Submit</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Courses courses={courses} />
            </Container>
        </>
    )
}