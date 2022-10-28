import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Navs } from '../Navs/Navs';
import Alert from 'react-bootstrap/Alert';
import Axios from 'axios';


export function AddCourses() {
    const [validated, setValidated] = useState(false);

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [time, setTime] = useState();
    const [msg , setMsg] = useState();

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }
    const handlePrice = (e) => {
        setPrice(e.target.value);
    }
    const handleTime = (e) => {
        setTime(e.target.value);
    }


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else{
            event.preventDefault();
            setValidated(true);
            Axios({
                method: "POST",
                data: {
                    title: title,
                    description: description,
                    price: price,
                    time: time
                },
                withCredentials: true,
                url: process.env.REACT_APP_URL + "/courses/add",
            }).then((res) => {

                setMsg('Course added')
                console.log(res)
            });
        }
    };

    return (
        <>
        <Navs />
        <Container className='mt-3'>
            <Col>
            {msg? <Alert key='success' variant='success'>
            {msg}
        </Alert> : "" }
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Course name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Course name" onChange={handleTitle}
                                />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                required
                                type="text"

                                onChange={handleDescription}
                                />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                            <Form.Label>Price</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    onChange={handlePrice}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Please add a price.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="text" placeholder="Time" required onChange={handleTime} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Time.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button type="submit">Submit form</Button>
                </Form>
            </Col>
        </Container>
        </>
    );
}