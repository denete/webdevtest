import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { addLocaleData, IntlProvider } from "react-intl";

import App from "./App";
import dataReducer from "./reducers/dataReducer";

const appLocale = window.appLocale;
addLocaleData(appLocale.data);

const store = createStore(dataReducer, {}, applyMiddleware(reduxThunk));


const jsx = (
	<IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
		<Provider store={store}>
			<App />
		</Provider>
	</IntlProvider>
);

ReactDOM.render(jsx, document.getElementById("root"));