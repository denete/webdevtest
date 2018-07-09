import React from "react";

import moment from "moment";

import { injectIntl, defineMessages } from "react-intl";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

const messages = defineMessages({
	total_tickets_entered: {
		id: "TOTAL_TICKETS_ENTERED",
		defaultMessage: "Your total tickets entered"
	},
	entry_description: {
		id: "ENTRY_DESCRIPTION",
		defaultMessage: "All entries are locked in at the time they are submitted and cannot be deleted."
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

const entryHeaders = ["entry_number", "date"];

const EntriesTable = ({ intl, promotionData }) => {
    const entriesTHeadContent = entryHeaders.map((entryHeaderKey, index) => {
        const headerKey = `header${index}`;
        const headerText = intl.formatMessage(messages[entryHeaderKey]);
        return <Th key={ headerKey }>{ headerText }</Th>;
    });

    const entriesTBodyContent = promotionData.entries.map((entryData, index) => {
        const key = `entries${index}`;
        const entryDate = moment(entryData.date).format("dddd, MMMM DD, YYYY");
        return (
            <Tr key={ key }>
                <Td>{ entryData.entry_number }</Td>
                <Td>{ entryDate }</Td>
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

export default injectIntl(EntriesTable);