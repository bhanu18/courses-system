import React from "react"
import { Cards } from "./Cards/Cards";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const Courses = (props) =>{
    return (
        <Row>
            {props.courses.map((item) => (
                <Col className="mb-3" key={item._id}>
                <Cards title={item.title} price={item.price} description={item.description} time={item.time} />
                </Col>
            ))}
        </Row>
    );
}