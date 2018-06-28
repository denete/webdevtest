import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";

import PromotionPage from "./components/PromotionPage";

import NotFoundPage from "./components/NotFoundPage";

import { fetchData } from "./actions/fetchData";

class App extends React.Component {
	componentDidMount() {
        this.props.fetchData();
    }

	render() {
		return (
            <BrowserRouter>
                <Switch>
                    <Route path="/index.html" component={PromotionPage} exact />
                    <Route component={NotFoundPage} />
                </Switch>
            </BrowserRouter>
		);
	}
}

export default connect(null, { fetchData })(App);
