import React from "react";
import { Button, ButtonGroup, Col, Row, Table } from "react-bootstrap";

class IoSandbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.loadFromLocalStorage();
  }

  loadFromLocalStorage = () => {
    let stored = localStorage.getItem(this.constructor.name);
    if (!stored) {
      console.log(
        `Error when loading from localStorage[${this.constructor.name}]`
      );
    }
    stored = JSON.parse(stored);
    return {
      input: stored || "",
      output: this.process(stored) || ""
    };
  };

  onLoadFromLocalStorage = () => {
    this.setState(this.loadFromLocalStorage());
  };

  onSaveToLocalStorage = () => {
    localStorage.setItem(
      this.constructor.name,
      JSON.stringify(this.state.input)
    );
  };

  onChange = ev => {
    let input = ev.target.value;
    this.setState({
      input: input,
      output: this.process(input)
    });
  };

  process = input => "Override me!";

  testPairs = [];

  render() {
    return (
      <Col>
        <Row>
          <h3>{this.constructor.name}</h3>
        </Row>
        <Row>
          <ButtonGroup>
            <Button onClick={this.onSaveToLocalStorage}>Save</Button>
            <Button onClick={this.onLoadFromLocalStorage}>Load</Button>
          </ButtonGroup>
        </Row>
        <Row>
          <Col>
            Input
            <textarea
              style={{ width: "95%", height: 300 }}
              onChange={this.onChange}
              value={this.state.input}
            />
          </Col>
          <Col>
            Output
            <textarea
              style={{ width: "95%", height: 300 }}
              value={this.state.output}
              disabled
            />
          </Col>
        </Row>
        <Row>
          <h4>Test inputs</h4>
        </Row>
        <Row>
          <IoTable ioPairs={this.testPairs} process={this.process} />
        </Row>
        <Row>
          <h4>Implementation</h4>
        </Row>
        <Row>
          <pre>{this.process.toString()}</pre>
        </Row>
      </Col>
    );
  }
}

const IoTable = ({ ioPairs, process }) =>
  !ioPairs || ioPairs.length === 0 ? (
    <span />
  ) : (
    <Table>
      <thead>
        <tr>
          <th>Input</th>
          <th>Expected Output</th>
          <th>Output</th>
          <th>Valid</th>
        </tr>
      </thead>
      <tbody>
        {ioPairs.map(io => {
          let [inp, out] = io;
          let actual = "wip"; // await process(io[inp]);
          return (
            <tr>
              <td>
                <pre>{inp}</pre>
              </td>
              <td>
                <pre>{out}</pre>
              </td>
              <td>
                <pre>{actual}</pre>
              </td>
              <td>{false ? "yes" : "no"}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );

export default IoSandbox;
