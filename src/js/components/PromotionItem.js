import React from "react";

import moment from "moment";

import { injectIntl, defineMessages } from "react-intl";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

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
	}
});

const drawingHeaders = ["Prize", "Entry deadline", "drawing date"];

const entryHeaders = ["Entry number", "date"];

class PromotionItem extends React.Component {
    renderDrawingSchedule (promotionData) {
        const { intl } = this.props;

        const drawingsTHeadContent = drawingHeaders.map((drawingHeader, index) => {
            const headerKey = `header${index}`;
            return <Th key={ headerKey }>{ drawingHeader }</Th>;
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
            <div>
                <p>{ drawingScheduleText }</p>
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

        const entriesTHeadContent = entryHeaders.map((entryHeader, index) => {
            const headerKey = `header${index}`;
            return <Th key={ headerKey }>{ entryHeader }</Th>;
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
            <div>
                <p>{ totalTicketsEnteredText } { promotionData.entries.length }</p>
                <p>{ entryDescriptionText }</p>
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
        const { promotionData } = this.props;

        return (
            <div>
                <img src={promotionData.promo_image_url}></img>
                <div>{promotionData.promotion_name}</div>
                { this.renderDrawingSchedule(promotionData) }
                <p>{promotionData.entry_info}</p>
                { this.renderEntries(promotionData) }
            </div>
        );
    }
}

export default injectIntl(PromotionItem);