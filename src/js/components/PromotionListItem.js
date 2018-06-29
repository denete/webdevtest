import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { injectIntl, defineMessages } from "react-intl";

const messages = defineMessages({
	next_drawing_date: {
		id: "NEXT_DRAWING_DATE",
		defaultMessage: "Next Drawing Date:"
	}
});

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
        const { intl } = this.props;
        const nextDrawingDate = moment(nextDrawingData.drawing_date).format("dddd, MMMM DD, YYYY");
        const nextDrawingDateText = intl.formatMessage(messages.next_drawing_date);
        return <div>{nextDrawingDateText} {nextDrawingDate}</div>
    }

    render () {
        const { url, promotionData, serverTimeData } = this.props;
        return (
            <div>
                <img src={promotionData.promo_image_url}></img>
                <Link to={url}>{promotionData.promotion_name}</Link>
                <div>{promotionData.summary}</div>
                { this.getNextDrawing(promotionData.drawings, serverTimeData) }
            </div>
        );
    }
}

export default injectIntl(PromotionListItem);