import moment from "moment";

const nextEventInTime = (eventsData, field, serverTimeData) => {
    let nextEventData = null;
    let minDiff = null;
    eventsData.forEach(eventData => {
        const diff = moment(eventData[field]) - moment(serverTimeData);
        if(minDiff == null || (diff > 0 && diff <= minDiff)) {
            minDiff = diff;
            nextEventData = eventData;
        }
    });
    return nextEventData;
}

export { nextEventInTime };