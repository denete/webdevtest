import React from "react";

class PromotionListItem extends React.Component {
    render () {
        const { promotionData } = this.props;
        return (
            <div>
                <div>{promotionData.promo_image_url}</div>
                <div>{promotionData.promotion_name}</div>
                <p>TODO next drawing date</p>
            </div>
        );
    }
}

export default PromotionListItem;