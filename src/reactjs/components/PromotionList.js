import React from "react";
import numeral from "numeral";
import PromotionListItem from "./PromotionListItem";

const PromotionList = ({ data }) => {
    const { promotion_objects: promotionsData, server_time: serverTimeData } = data;
    const promotionListItems = promotionsData.map((promotionData, index) => {
        const key = `promotionListItem${index}`;
        const url = `/promo/promo${numeral(index + 1).format("00")}`;
        return (
            <PromotionListItem
                key={key}
                url={url}
                serverTimeData={serverTimeData}
                promotionData={promotionData}
            />
        );
    });

    return (
        <div className="promotionListView">
            <div className="promotionList container">
                { promotionListItems }
            </div>
        </div>
    );
};

export default PromotionList;