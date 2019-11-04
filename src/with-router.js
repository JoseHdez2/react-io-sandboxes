import React from "react";
import ReactDOM from "react-dom";
import { StyleSheet, Text, View } from "react-native";
import { Link, NativeRouter, Route } from "react-router-native";
// import TagsToggler from "./tags-toggler";
import Clipboardy from "clipboardy";
import MyMermaid from "./my-mermaid";
import GamesApp from "./tags/game-list";
import AppSmall from "./app-small";
// import Mermaid from "react-mermaid";

import "./styles.css";

if (typeof String.prototype.trim === "undefined") {
  String.prototype.trim = function() {
    return String(this).replace(/^\s+|\s+$/g, "");
  };
}

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

const AppWithRouter = () => <App pathponents={pathponents} />;

export AppWithRouter;