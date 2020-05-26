import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Products from "./components/Products";

export default () => (
  <Router>
    <Route path="/products/:category">
      <Products />
    </Route>
  </Router>
);
