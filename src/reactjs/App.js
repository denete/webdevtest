import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";

import PromotionListView from "./components/PromotionListView";

import PromotionView from "./components/PromotionView";

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
                    <Route path="/" component={PromotionListView} exact />
                    <Route path="/promo/:id" component={PromotionView} />
                    <Route component={NotFoundPage} />
                </Switch>
            </BrowserRouter>
		);
	}
}

export default connect(null, { fetchData })(App);
