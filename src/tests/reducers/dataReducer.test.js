import dataReducer from "./../../reactjs/reducers/dataReducer";
import { FETCH_DATA } from "./../../reactjs/actions/types";
import testData from "./../testData";

test('should set data for fetch', () => {
    const action = { type: FETCH_DATA, payload: testData };
    const state = dataReducer(undefined, action);
    expect(state).toEqual({
        data: testData
    });
});