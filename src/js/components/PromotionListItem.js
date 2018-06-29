import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { injectIntl, defineMessages } from "react-intl";
import { nextEventInTime } from "./../utils/nextEventInTime";

const messages = defineMessages({
	next_drawing_date: {
		id: "NEXT_DRAWING_DATE",
		defaultMessage: "Next Drawing Date:"
	}
});

class PromotionListItem extends React.Component {
    getNextDrawing (drawingsData, serverTimeData) {
        const nextDrawingData = nextEventInTime(drawingsData, "drawing_date", serverTimeData);
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
                <h1><Link to={url}>{promotionData.promotion_name}</Link></h1>
                <div>{promotionData.summary}</div>
                { this.getNextDrawing(promotionData.drawings, serverTimeData) }
            </div>
        );
    }
}

export default injectIntl(PromotionListItem);