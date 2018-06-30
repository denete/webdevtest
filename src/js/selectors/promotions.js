import moment from 'moment';

import { nextEventInTime } from "./../utils/nextEventInTime";

const getSortedPromotions = (promotions) => {
    if (promotions) {
        promotions.promotion_objects.sort((a, b) => {
            const nextDrawingA = nextEventInTime(a.drawings, "drawing_date", a.server_time);
            const nextDrawingDateA = moment(nextDrawingA.drawing_date);
            const nextDrawingB = nextEventInTime(b.drawings, "drawing_date", b.server_time);
            const nextDrawingDateB = moment(nextDrawingB.drawing_date);
            return nextDrawingDateA < nextDrawingDateB ? -1 : 1;
        });
    };
    return promotions;
};

export default getSortedPromotions;