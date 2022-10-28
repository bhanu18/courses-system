import React from "react";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Cards.css';

export const Cards = (props) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.image ? props.image : 'https://image.shutterstock.com/image-photo/supersilent-cooling-fan-computer-120x120mm-600w-16985527.jpg'} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.description} <br />
          Price: {props.price} <br />
          Time: {props.time} <br />
        </Card.Text>
        <Button variant="primary"><a className="card-link" href={props.link}> Go Here</a></Button>
      </Card.Body>
    </Card>
  )
} 