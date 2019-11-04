import React from "react";
import mysql from "mysql";

class MySqlPostman extends React.Component {
  config = {
    host: "remotemysql.com",
    port: 3306,
    user: "UgJJQSvLHx",
    password: "NJnrKLLU53",
    database: "UgJJQSvLHx"
  };

  componentWillMount = async () => {
    let newConn = mysql.createConnection(this.config);
    newConn.connect();
    this.setState({
      conn: newConn
    });
  };

  render = () => (
    <div>
      <h2>MySqlPostman</h2>
    </div>
  );
}

let terms = ["1NF", "2NF", "3NF", "update anomaly"];

let _1NF = {};

const Converter = () => <p>Converter</p>;

export default MySqlPostman;
