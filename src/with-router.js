import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link, NativeRouter, Route } from "react-router-native";

import "./styles.css";

export const AppWithRouter = ({ pathponents }) => (
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
