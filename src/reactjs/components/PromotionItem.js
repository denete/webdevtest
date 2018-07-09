import React from "react";

import moment from "moment";

import { injectIntl, defineMessages } from "react-intl";

import { nextEventInTime } from "./../utils/nextEventInTime";

import ErrorComponent from "./ErrorComponent";

import DrawingsTable from "./DrawingsTable";

import EntriesTable from "./EntriesTable";

const messages = defineMessages({
    next_entry_deadline: {
        id: "NEXT_ENTRY_DEADLINE",
        defaultMessage: "The Next Entry Deadline is"
    },
    date: {
        id: "DATE",
        defaultMessage: "Date"
    }
});

export class PromotionItem extends React.Component {

    render () {
        const { data, promotionIndex, intl } = this.props;
        const promotionData = data.promotion_objects[promotionIndex];
        if (promotionData === undefined) {
            return <ErrorComponent />;
        }
        const serverTimeData = data.server_time;

        const nextEntryDeadlineText = intl.formatMessage(messages.next_entry_deadline);
        const nextEntryData = nextEventInTime(promotionData.entries, "date", serverTimeData);
        const nextEntryDate = moment(nextEntryData.date).format("dddd, MMMM DD, YYYY");

        const imageSrc = `/${promotionData.promo_image_url}`;
        return (
            <div className="promotionView">
                <div className="promotionItem container">
                    <div className="nextEntryContainer">
                        <p>{ nextEntryDeadlineText }</p>
                        <p>{ nextEntryDate }</p>
                    </div>
                    <div className="promotionItemImg">
                        <img src={ imageSrc }></img>
                    </div>
                    <h1>{ promotionData.promotion_name }</h1>
                    <p>{ promotionData.summary }</p>
                    <DrawingsTable promotionData={ promotionData } />
                    <p>{ promotionData.entry_info }</p>
                    <EntriesTable promotionData={ promotionData } />
                </div>
            </div>
        );
    }
}

export default injectIntl(PromotionItem);