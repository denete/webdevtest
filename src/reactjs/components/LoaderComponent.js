import React from "react";

import { injectIntl, defineMessages } from "react-intl";

const messages = defineMessages({
	loading: {
		id: "LOADING",
		defaultMessage: "Loading..."
	}
});

class LoaderComponent extends React.Component {
    render () {
        const loadingText = this.props.intl.formatMessage(messages.loading);
        return (
            <div className="loader">
              <div className="loaderInner">
                { loadingText }
              </div>
            </div>
        );
    }
}

export default injectIntl(LoaderComponent);