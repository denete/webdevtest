import React from "react";

import { injectIntl, defineMessages } from "react-intl";

const messages = defineMessages({
	error: {
		id: "ERROR",
		defaultMessage: "Error"
	}
});

class ErrorComponent extends React.Component {
    render () {
        const loadingText = this.props.intl.formatMessage(messages.error);
        return (
            <div className="modal">
              <div className="modalInner">
                { loadingText }
              </div>
            </div>
        );
    }
}

export default injectIntl(ErrorComponent);