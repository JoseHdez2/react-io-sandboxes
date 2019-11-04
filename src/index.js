import React from "react";
import ReactDOM from "react-dom";
import { StyleSheet, Text, View } from "react-native";
import { Link, NativeRouter, Route } from "react-router-native";
// import TagsToggler from "./tags-toggler";
import Stuff from "./stuff";
import Clipboardy from "clipboardy";
import MyMermaid from "./my-mermaid";
import GamesApp from "./tags/game-list";
import AppSmall from "./app-small";
// import Mermaid from "react-mermaid";

import "./styles.css";
const mergePatch = require("tiny-merge-patch").apply;

if (typeof String.prototype.trim === "undefined") {
  String.prototype.trim = function() {
    return String(this).replace(/^\s+|\s+$/g, "");
  };
}

// var Mermaid = require("react-mermaid");

const WIP = () => <p>WIP!</p>;

class AddFullStop extends Stuff {
  process = input => input + ".";
  testInputs = ["phrase with(out) full stop", "trailing dots..."];
}

class CsvToSqlInsert extends Stuff {
  process = input => {
    let lines = input.split("\n");
    let first = `INSERT INTO table(${lines[0]}) VALUES\n`;
    lines.shift();
    return (
      `INSERT INTO table(${first}) VALUES\n` +
      lines.map(l => `(${l.replace("\n", "")}),\n`)
    );
  };
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

class RemoveDuplicates extends Stuff {
  process = input =>
    input
      .split("\n")
      .filter(onlyUnique)
      .join("\n");
}

const recombine = (array, sep = ",") =>
  array.flatMap((v, i) => array.slice(i + 1).map(w => v + sep + w));

class RecombineComp extends Stuff {
  process = input => recombine(input.split("\n")).join("\n");

  testPairs = [
    [
      "banana\nchocolate\npeanut-butter",
      "banana,chocolate\nbanana,peanut-butter\nchocolate,peanut-butter"
    ]
  ];
}

class JsonMerge extends Stuff {
  process = input => {
    let [file, patch] = input
      .split("%")
      .map(str => str.trim())
      .map(str => JSON.parse(str));
    return JSON.stringify(mergePatch(file, patch));
  };

  testPairs = [['{"a": "b"} % {"a": "c"}']];
}

class ClipboardyComp extends Stuff {
  process = input => {
    Clipboardy.writeSync("something");
    return input;
  };
}

class CountLines extends Stuff {
  process = input => {
    return input.split("\n").length;
  };
}

/* const MermaidReact = () => (
  <Mermaid name="diagram">graph TD; A-->B; A-->C; B-->D; C-->D;</Mermaid>
); */

const pathponents = [
  { path: "/add-full-stop", text: "Add Full Stop", component: AddFullStop },
  { path: "/rd", text: "Remove duplicates", component: RemoveDuplicates },
  { path: "/cl", text: "Count lines", component: CountLines },
  { path: "/recombine", text: "Recombine", component: RecombineComp },
  {
    path: "/json-merge",
    text: "JSON Merge Patch (RFC 7396)",
    component: JsonMerge
  },
  { path: "/app-small", text: "Apps (small)", component: AppSmall },
  { path: "/files-diff", text: "Files Diff (WIP)", component: WIP },
  { path: "/mmm", text: "My Mermaid", component: MyMermaid },
  { path: "/csv2sql", text: "CSV to SQL insert", component: CsvToSqlInsert },
  { path: "/games", text: "Games App", component: GamesApp },
  { path: "/clipboardy", text: "Clipboardy", component: ClipboardyComp }
];

const App = ({ pathponents }) => (
  <NativeRouter>
    <View>
      <View>
        {pathponents.map(pp => (
          <Link to={pp.path}>
            <Text>{pp.text}</Text>
          </Link>
        ))}
      </View>

      <Route exact path="/" component={Home} />
      {pathponents.map(pp => (
        <Route path={pp.path} component={pp.component} />
      ))}
    </View>
  </NativeRouter>
);

const Home = () => (
  <span>
    <h2>Small I/O modules</h2>
    <p>Click a link.</p>
  </span>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App pathponents={pathponents} />, rootElement);
