import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Promotions from "./pages/promotions";
import Promo from "./pages/promo";

// Main File for the React App

const app = document.getElementById('app');
ReactDOM.render(
  <Router history={hashHistory}>
    <div>
      <Route path="/" component={Promotions}></Route>
      <Route path="promotion/:promo_index" component={Promo}></Route>
    </div>
  </Router>,
  app);
