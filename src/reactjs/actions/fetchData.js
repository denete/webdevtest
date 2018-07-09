import axios from "axios";

import { FETCH_DATA } from "./types";

export const fetchData = () => async dispatch => {
    const res = await axios.get("/js/webdevtest-data.js");
	dispatch({ type: FETCH_DATA, payload: res.data });
};