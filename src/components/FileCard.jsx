import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import React, { useState, useEffect } from "react";

var AWS = require("aws-sdk");
var config = require("../config");

AWS.config.update(config);
let s3 = new AWS.S3();

let imgUrl = null;

export default function FileCard(props) {
  let [img, setImg] = useState(imgUrl);

  useEffect(() => {
    s3.getObject(
      { Bucket: process.env.REACT_APP_S3_BUCKET, Key: props.name },
      function (err, d) {
        if (err) {
          console.log(err);
          setImg(null);
        } else {
          var binary = "";
          var len = d.Body.byteLength;
          for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(d.Body[i]);
          }
          setImg(`data:${d.ContentType};base64,` + btoa(binary));
        }
      }
    );
  }, []);

  return (
    <Col>
      <Card style={{ width: "18rem" }}>
        <Card.Img src={img} />
        <Card.Title>{props.name}</Card.Title>
        <Accordion flush style={{ padding: "5px" }}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Теги</Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                {props.tags.map((item) => {
                  return (
                    <ListGroup.Item key={item.id}>{item.name}</ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card>
    </Col>
  );
}
