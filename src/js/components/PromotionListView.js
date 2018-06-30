import React from "react";

import { injectIntl, defineMessages } from "react-intl";

import { connect } from "react-redux";

import getSortedPromotions from "./../selectors/promotions";

import PromotionList from "./PromotionList";

const messages = defineMessages({
	loading: {
		id: "LOADING",
		defaultMessage: "Loading"
	}
});

class PromotionListView extends React.Component {

    render () {
        const { data } = this.props;

        if (data === undefined) {
            const loadingText = this.props.intl.formatMessage(messages.loading);
            return <div>{ loadingText }</div>;
        }
        
        return <PromotionList data={data} />;
    }
    
}

function mapStateToProps({ data }) {
	return {
		data: getSortedPromotions(data)
	};
}

export default connect(mapStateToProps)(injectIntl(PromotionListView));