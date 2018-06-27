import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./App";
import dataReducer from "./reducers/dataReducer";

const store = createStore(dataReducer, {}, applyMiddleware(reduxThunk));

const jsx = (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(jsx, document.getElementById("root"));