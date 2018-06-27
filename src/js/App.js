import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import { connect } from "react-redux";

import PromotionView from "./components/PromotionView";

import { fetchData } from "./actions/fetchData";

class App extends React.Component {
	componentDidMount() {
        this.props.fetchData();
    }

	render() {
		return (
            <BrowserRouter>
                <Route path="/index.html" component={PromotionView} exact />
            </BrowserRouter>
		);
	}
}

export default connect(null, { fetchData })(App);
