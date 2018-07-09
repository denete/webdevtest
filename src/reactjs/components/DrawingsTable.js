import React from "react";

import { injectIntl, defineMessages } from "react-intl";

import moment from "moment";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

import { getNumberPrize } from "./../utils/getNumberPrize";

const messages = defineMessages({
	drawing_schedule: {
		id: "DRAWING_SCHEDULE",
		defaultMessage: "Drawings schedule"
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
    }
});

const drawingHeaders = ["prize", "entry_deadline", "drawing_date"];

const DrawingsTable = ({ intl, promotionData }) => {
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
            <Tr key={ key }>
                <Td>{ getNumberPrize(drawingData.prize) }</Td>
                <Td>{ deadlineDate }</Td>
                <Td>{ drawingDate }</Td>
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

export default injectIntl(DrawingsTable);