import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Courses } from "./Courses";
import { Navs } from './Navs/Navs';
import Axios from 'axios';

export const Home = () => {
    const [ courses, setCourses ] = useState([]);

    const [val, setVal] = useState();

    const role = localStorage.getItem('role');

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

    useEffect(() => {
        sendGetRequest();
    }, [])

    
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

    if(role === 'Instructor'){
        window.location.href = '/View'
    }
    return (
        <>
        <Navs />
        <Container className="mt-5">
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