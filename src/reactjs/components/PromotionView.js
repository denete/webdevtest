import React from "react";

import { connect } from "react-redux";

import getSortedPromotions from "./../selectors/promotions";

import PromotionItem from "./PromotionItem";

import LoaderComponent from "./LoaderComponent";

class PromotionView extends React.Component {

    render () {
        const { data, promotionIndex } = this.props;

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