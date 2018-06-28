import React from "react";
import PromotionListItem from "./PromotionListItem";

class PromotionList extends React.Component {
    render () {
        console.log(this.props.promotionsData);
        const promotionListItems = this.props.promotionsData.map((promotionData, index) => {
            return <PromotionListItem key={"promotionListItem" + index} promotionData={promotionData} />;
        })

        return <div>{ promotionListItems }</div>
    }
}

export default PromotionList;