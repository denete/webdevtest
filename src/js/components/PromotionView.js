import React from "react";

import { connect } from "react-redux";

class PromotionView extends React.Component {
    componentDidMount () {
        console.log(this.props.location.search);
    }

    render () {
        console.log(this.props);
        return <div>PromotionView</div>
    }
}

function mapStateToProps({ data }) {
	return {
		data
	};
}

export default connect(mapStateToProps)(PromotionView);