import React from "react";

import { injectIntl, defineMessages } from "react-intl";

import { connect } from "react-redux";

import getSortedPromotions from "./../selectors/promotions";

import PromotionItem from "./PromotionItem";

const messages = defineMessages({
	loading: {
		id: "LOADING",
		defaultMessage: "Loading"
	}
});

class PromotionView extends React.Component {

    render () {
        const { data, promotionIndex } = this.props;

        if (data === undefined) {
            const loadingText = this.props.intl.formatMessage(messages.loading);
            return <div>{ loadingText }</div>;
        }
        
        return <PromotionItem data={data} promotionIndex={promotionIndex} />;
    }
    
}

function mapStateToProps({ data }) {
	return {
		data: getSortedPromotions(data)
	};
}

export default connect(mapStateToProps)(injectIntl(PromotionView));