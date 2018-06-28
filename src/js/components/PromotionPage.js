import React from "react";

import { connect } from "react-redux";

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
        const promoIndex = parseInt(promoIdRet, 0);
        console.log(promoIndex);
        return promoIndex;
    }

    renderPromoList (data) {
        return <div>Promo List</div>;
    }

    renderPromoItem (data, promoIndex) {
        console.log(data.promotion_objects[promoIndex]);
        return <div>Promo Item</div>;
    }

    render () {
        const { data } = this.props;

        if (data === undefined) {
            return "Loading";
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

export default connect(mapStateToProps)(PromotionPage);