import { SEARCH_DATA } from "../actions/types";

const DefaultFilters = {
    text: null
}

export default function (state = DefaultFilters, action) {
    switch (action.type) {
        case SEARCH_DATA: 
            return {
                text: action.payload
            };
        
        default: 
            return state;
    }
}