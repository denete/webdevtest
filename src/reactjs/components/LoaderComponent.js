import React from "react";

import { injectIntl, defineMessages } from "react-intl";

const messages = defineMessages({
	loading: {
		id: "LOADING",
		defaultMessage: "Loading..."
	}
});

export class LoaderComponent extends React.Component {
    render () {
        const loadingText = this.props.intl.formatMessage(messages.loading);
        return (
            <div className="modal">
              <div className="modalInner">
                { loadingText }
              </div>
            </div>
        );
    }
}

export default injectIntl(LoaderComponent);