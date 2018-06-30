import React from "react";

import { connect } from "react-redux";

import getSortedPromotions from "./../selectors/promotions";

import PromotionList from "./PromotionList";

import LoaderComponent from "./LoaderComponent";

class PromotionListView extends React.Component {

    render () {
        const { data } = this.props;

        if (data === undefined) {
            return <LoaderComponent />;
        }
        
        return <PromotionList data={data} />;
    }
    
}

function mapStateToProps({ data }) {
	return {
		data: getSortedPromotions(data)
	};
}

export default connect(mapStateToProps)(PromotionListView);