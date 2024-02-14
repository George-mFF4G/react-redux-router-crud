import React from 'react'

import {
    Container,
    Row,
    Col,
    Button
  } from "react-bootstrap";
import { useRouteError,useNavigate } from "react-router-dom";



export default function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();
  return (
    <Container>
    <Row>
    <div className="mt-5 text-center">
      <Col xs={{ span: 8, offset: 2 }}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occuried.</p>
      <p>
      <i>{error.statusText || error.message}</i>
      </p>
      <Button variant="link" onClick={()=>navigate("/",{replace:true})}>Link</Button>
      </Col>
      </div>
    </Row>
  </Container>
  );
}
