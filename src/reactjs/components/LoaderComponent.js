import React from "react";

import { injectIntl, defineMessages } from "react-intl";

const messages = defineMessages({
	loading: {
		id: "LOADING",
		defaultMessage: "Loading..."
	}
});

export const LoaderComponent = ({ intl }) => {
    const loadingText = intl.formatMessage(messages.loading);
    return (
        <div className="modal">
            <div className="modalInner">
            { loadingText }
            </div>
        </div>
    );
}

export default injectIntl(LoaderComponent);