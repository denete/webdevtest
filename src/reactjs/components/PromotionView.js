import React from "react";

import { connect } from "react-redux";

import getSortedPromotions from "./../selectors/promotions";

import PromotionItem from "./PromotionItem";

import LoaderComponent from "./LoaderComponent";

class PromotionView extends React.Component {

    getRequestedPromoIndex (promoID) {
        const promoIdRet = promoID.replace(/promo/g,'');
        const promoIndex = parseInt(promoIdRet, 0) - 1;
        return promoIndex;
    }
        
    render () {
        const { data, match: { params } } = this.props;
        const promotionIndex = this.getRequestedPromoIndex(params.id);

        if (data === undefined) {
            return <LoaderComponent />;
        }
        
        return <PromotionItem data={data} promotionIndex={promotionIndex} />;
    }
    
}

function mapStateToProps({ data }) {
	return {
		data: getSortedPromotions(data)
	};
}

export default connect(mapStateToProps)(PromotionView);