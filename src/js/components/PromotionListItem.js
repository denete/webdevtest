import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

class PromotionListItem extends React.Component {
    getNextDrawing (drawingsData, serverTimeData) {
        let nextDrawingData = null;
        let minDiff = null;
        drawingsData.forEach(drawingData => {
            const diff = moment(drawingData.drawing_date) - moment(serverTimeData);
            if(minDiff == null || (diff > 0 && diff <= minDiff)) {
                minDiff = diff;
                nextDrawingData = drawingData;
            }
        });
        const nextDrawingDate = moment(nextDrawingData.drawing_date).format("dddd, MMMM DD, YYYY");
        return <div>Next Drawing Date: {nextDrawingDate}</div>
    }

    render () {
        const { url, promotionData, serverTimeData } = this.props;
        return (
            <div>
                <div>{promotionData.promo_image_url}</div>
                <Link to={url}>{promotionData.promotion_name}</Link>
                <div>{promotionData.summary}</div>
                { this.getNextDrawing(promotionData.drawings, serverTimeData) }
            </div>
        );
    }
}

export default PromotionListItem;