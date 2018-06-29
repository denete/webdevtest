import React from "react";
import { injectIntl, defineMessages } from "react-intl";

import { connect } from "react-redux";
import PromotionItem from "./PromotionItem";
import PromotionList from "./PromotionList";

const messages = defineMessages({
	loading: {
		id: "LOADING",
		defaultMessage: "Loading"
	}
});

class PromotionPage extends React.Component {
    shouldRenderPromoList () {
        const { search } = this.props.location;
        if (search && search.indexOf("?") !== -1) {
            return false;
        }

        return true;
    }

    getRequestedPromoIndex () {
        const { search } = this.props.location;
        const params = new URLSearchParams(search);
        const promoID = params.get('promo');
        const promoIdRet = promoID.replace(/promo/g,'');
        const promoIndex = parseInt(promoIdRet, 0) - 1;
        return promoIndex;
    }

    renderPromoList (data) {
        return <PromotionList data={data} />;
    }

    renderPromoItem (data, promoIndex) {
        const promotionData = data.promotion_objects[promoIndex];
        return <PromotionItem promotionData={promotionData} />;
    }

    render () {
        const { data } = this.props;

        if (data === undefined) {
            const loadingText = this.props.intl.formatMessage(messages.loading);
            return <div>{ loadingText }</div>;
        }

        if (this.shouldRenderPromoList() === true) {
            return this.renderPromoList(data);
        } else {
            return this.renderPromoItem(data, this.getRequestedPromoIndex());
        }
    }
}

function mapStateToProps({ data }) {
	return {
		data
	};
}

export default connect(mapStateToProps)(injectIntl(PromotionPage));