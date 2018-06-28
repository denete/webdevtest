import React from "react";
import moment from "moment";

class PromotionItem extends React.Component {
    render () {
        const { promotionData } = this.props;
        
        const drawings = promotionData.drawings.map((drawingData, index) => {
            const key = `drawings${index}`;
            const deadlineDate = moment(drawingData.entry_deadline).format("dddd, MMMM DD, YYYY");
            const drawingDate = moment(drawingData.drawing_date).format("dddd, MMMM DD, YYYY");
            return (
                <div key={key}>
                    <div>{drawingData.prize}</div>
                    <div>{deadlineDate}</div>
                    <div>{drawingDate}</div>
                </div>
            );
        });

        const entries = promotionData.entries.map((entryData, index) => {
            const key = `entries${index}`;
            const entryDate = moment(entryData.date).format("dddd, MMMM DD, YYYY");
            return (
                <div key={key}>
                    <div>{entryData.entry_number}</div>
                    <div>{entryDate}</div>
                </div>
            );
        });

        return (
            <div>
                <div>{promotionData.promo_image_url}</div>
                <div>{promotionData.promotion_name}</div>
                <p>Drawings schedule</p>
                <div>{drawings}</div>
                <p>{promotionData.entry_info}</p>
                <p>Your total tickets entered {promotionData.entries.length}</p>
                <p>All entries are locked in at the time they are submitted and cannot be deleted.</p>
                <div>{entries}</div>
            </div>
        );
    }
}

export default PromotionItem;