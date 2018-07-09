import axios from "axios";

import { SEARCH_DATA } from "./types";

export const searchData = (text) => async dispatch => {
	dispatch({ type: SEARCH_DATA, payload: text });
};