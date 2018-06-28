import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import { connect } from "react-redux";

import PromotionPage from "./components/PromotionPage";

import { fetchData } from "./actions/fetchData";

class App extends React.Component {
	componentDidMount() {
        this.props.fetchData();
    }

	render() {
		return (
            <BrowserRouter>
                <Route path="/index.html" component={PromotionPage} exact />
            </BrowserRouter>
		);
	}
}

export default connect(null, { fetchData })(App);
