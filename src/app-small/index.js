import React from "react";
import { Link, NativeRouter, Route } from "react-router-native";
import { StyleSheet, Text, View } from "react-native";

const pathponents = [
  { path: "/add-full-stop", text: "Something", component: Home2 }
];

const App2 = ({ pathponents }) => (
  <NativeRouter>
    <View>
      <View>
        {pathponents.map(pp => (
          <Link to={pp.path}>
            <Text>{pp.text}</Text>
          </Link>
        ))}
      </View>

      {pathponents.map(pp => (
        <Route path={pp.path} component={pp.component} />
      ))}
    </View>
  </NativeRouter>
);

const Home2 = () => (
  <span>
    <h2>Small I/O modules</h2>
    <p>Click a link.</p>
  </span>
);

const App3 = () => <App2 pathponents={pathponents} />;

export default App3;
