import React from "react";
import { Col, Row, Card, ListGroup } from "react-bootstrap";
import { cardRanks } from "./poker-card";
import ChoiceDropdown from "../components/choice-dropdown";

const RankDropdown = ({ title }) => (
  <Row>
    <ChoiceDropdown title={title} choices={cardRanks} />
  </Row>
);

const Poker = () => (
  <Col>
    <RankDropdown title="First" />
  </Col>
);

export default Poker;
