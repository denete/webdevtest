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

    shouldRenderPromoList (props) {
        const { search } = props.location;
        if (search && search.indexOf("?") !== -1) {
            return false;
        }
        return true;
    }

    getRequestedPromoIndex (props) {
        const { search } = props.location;
        const params = new URLSearchParams(search);
        const promoID = params.get('promo');
        if (promoID === null) {
            return null;
        }

        const promoIdRet = promoID.replace(/promo/g,'');
        const promoIndex = parseInt(promoIdRet, 0) - 1;
        return promoIndex;
    }

    renderViews (props) {
        if (this.shouldRenderPromoList(props) === true) {
            return <PromotionListView />;
        } else {
            const requestedPromoIndex = this.getRequestedPromoIndex(props);
            if (requestedPromoIndex !== null) {
                return <PromotionView promotionIndex={requestedPromoIndex} />;
            } else {
                return <NotFoundPage />;
            }
        }
    }

	render() {
		return (
            <BrowserRouter>
                <Switch>
                    <Route path="/index.html" render={(props) => this.renderViews(props)} />
                    <Route component={NotFoundPage} />
                </Switch>
            </BrowserRouter>
		);
	}
}

export default connect(null, { fetchData })(App);
