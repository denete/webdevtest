import React from "react";

import moment from "moment";

import { injectIntl, defineMessages } from "react-intl";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

import { nextEventInTime } from "./../utils/nextEventInTime";

import ErrorComponent from "./ErrorComponent";

const messages = defineMessages({
	drawing_schedule: {
		id: "DRAWING_SCHEDULE",
		defaultMessage: "Drawings schedule"
	},
	total_tickets_entered: {
		id: "TOTAL_TICKETS_ENTERED",
		defaultMessage: "Your total tickets entered"
	},
	entry_description: {
		id: "ENTRY_DESCRIPTION",
		defaultMessage: "All entries are locked in at the time they are submitted and cannot be deleted."
    },
    next_entry_deadline: {
        id: "NEXT_ENTRY_DEADLINE",
        defaultMessage: "The Next Entry Deadline is"
    },
    prize: {
        id: "PRIZE",
        defaultMessage: "Prize"
    },
    entry_deadline: {
        id: "ENTRY_DEADLINE",
        defaultMessage: "Entry deadline"

    },
    drawing_date: {
        id: "DRAWING_DATE",
        defaultMessage: "Drawing date"
    },
    entry_number: {
        id: "ENTRY_NUMBER",
        defaultMessage: "Entry number"
    },
    date: {
        id: "DATE",
        defaultMessage: "Date"
    }
});

const drawingHeaders = ["prize", "entry_deadline", "drawing_date"];

const entryHeaders = ["entry_number", "date"];

export class PromotionItem extends React.Component {
    renderDrawingSchedule (promotionData) {
        const { intl } = this.props;

        const drawingsTHeadContent = drawingHeaders.map((drawingHeaderKey, index) => {
            const headerKey = `header${index}`;
            const headerText = intl.formatMessage(messages[drawingHeaderKey]);
            return <Th key={ headerKey }>{ headerText }</Th>;
        });

        const drawingsTBodyContent = promotionData.drawings.map((drawingData, index) => {
            const key = `drawings${index}`;
            const deadlineDate = moment(drawingData.entry_deadline).format("dddd, MMMM DD, YYYY");
            const drawingDate = moment(drawingData.drawing_date).format("dddd, MMMM DD, YYYY");
            return (
                <Tr key={key}>
                    <Td>{drawingData.prize}</Td>
                    <Td>{deadlineDate}</Td>
                    <Td>{drawingDate}</Td>
                </Tr>
            );
        });

        const drawingScheduleText = intl.formatMessage(messages.drawing_schedule);
        return (
            <div className="drawingScheduleTable">
                <h2>{ drawingScheduleText }</h2>
                <Table className="tableResults">
                    <Thead>
                        <Tr>{ drawingsTHeadContent }</Tr>
                    </Thead>

                    <Tbody>
                        { drawingsTBodyContent }
                    </Tbody>
                </Table>
            </div>
        );
    }

    renderEntries (promotionData) {
        const { intl } = this.props;

        const entriesTHeadContent = entryHeaders.map((entryHeaderKey, index) => {
            const headerKey = `header${index}`;
            const headerText = intl.formatMessage(messages[entryHeaderKey]);
            return <Th key={ headerKey }>{ headerText }</Th>;
        });

        const entriesTBodyContent = promotionData.entries.map((entryData, index) => {
            const key = `entries${index}`;
            const entryDate = moment(entryData.date).format("dddd, MMMM DD, YYYY");
            return (
                <Tr key={key}>
                    <Td>{entryData.entry_number}</Td>
                    <Td>{entryDate}</Td>
                </Tr>
            );
        });

        const totalTicketsEnteredText = intl.formatMessage(messages.total_tickets_entered);
        const entryDescriptionText = intl.formatMessage(messages.entry_description);
        return (
            <div className="entriesTable">
                <h2>{ totalTicketsEnteredText } { promotionData.entries.length }</h2>
                <p className="lockedEntry">{ entryDescriptionText }</p>
                <Table className="tableResults">
                    <Thead>
                        <Tr>
                            { entriesTHeadContent }
                        </Tr>
                    </Thead>

                    <Tbody>
                        { entriesTBodyContent }
                    </Tbody>
                </Table>
            </div>
        );
    }

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

        return (
            <div className="promotionView">
                <div className="promotionItem container">
                    <div className="nextEntryContainer">
                        <p>{ nextEntryDeadlineText }</p>
                        <p>{ nextEntryDate }</p>
                    </div>
                    <div className="promotionItemImg">
                        <img src={promotionData.promo_image_url}></img>
                    </div>
                    <h1>{promotionData.promotion_name}</h1>
                    <p>{promotionData.summary}</p>
                    { this.renderDrawingSchedule(promotionData) }
                    <p>{promotionData.entry_info}</p>
                    { this.renderEntries(promotionData) }
                </div>
            </div>
        );
    }
}

export default injectIntl(PromotionItem);