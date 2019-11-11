import React from "react";
import { Col, Row, Card, ListGroup } from "react-bootstrap";
import { getColor, prettifyCard, cards } from "./poker-card";

const good = ["AA"].map(k => [k, "good"]);
const ok = ["22"].map(k => [k, "ok"]);
const bad = ["A2", "2A"].map(k => [k, "bad"]);
const tSmallBlind = new Map([...good, ...ok, ...bad]);

class PokerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
}

const CARD_STYLE = { width: 100, height: 100, fontSize: "40px" };

const RankCard = rank => <Card style={CARD_STYLE}>{rank}</Card>;

const CardCard = (cardName, onClick) => (
  <Card
    style={{
      ...CARD_STYLE,
      color: getColor(cardName)
    }}
    onClick={() => onClick("this")}
  >
    {prettifyCard(cardName)}
  </Card>
);

const myOnClick = ev => alert("something");

const SomePokerCards = (elems, onClick) => (
  <Row>
    {cards.map(c => (
      <CardCard cardName={c} onClick={() => console.log("something")} />
    ))}
  </Row>
);

const Poker = () => (
  <Col>
    <Row>{/* <h1>Poker</h1> */}</Row>
    <Row>
      <SomePokerCards onClick={myOnClick} />
    </Row>
  </Col>
);

export default Poker;
