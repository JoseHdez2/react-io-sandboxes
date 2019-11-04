import React from "react";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";

import "./styles.css";

export class AppWithoutRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comp: Home
    };
  }

  setComp = aComp => {
    this.setState({
      comp: aComp
    });
  };

  render = () => (
    <Row>
      <Col>
        <ButtonGroup vertical variant="secondary">
          {this.props.pathponents.map(pp => (
            <Button onClick={() => this.setComp(pp.component)}>
              {pp.text}
            </Button>
          ))}
        </ButtonGroup>
      </Col>
      <Col>{this.state.comp}</Col>
    </Row>
  );
}

const Home = () => (
  <span>
    <h2>Small I/O modules</h2>
    <p>Click a link.</p>
  </span>
);
