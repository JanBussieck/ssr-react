import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Products from "./components/Products";
import hydrate from './hydrate';

const BasicExample = hydrate(({products}) => (
  <Router>
    <Route path="/products/:category">
      <Products initialProducts={products} />
    </Route>
  </Router>
));

ReactDOM.hydrate(
  <BasicExample />,
  document.getElementById("root")
);
