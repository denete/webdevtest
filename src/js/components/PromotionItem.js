import React from "react";

class PromotionItem extends React.Component {
    render () {
        const { promotionData } = this.props;
        
        const drawings = promotionData.drawings.map(drawingData => {
            return (
                <div>
                    <div>{drawingData.prize}</div>
                    <div>{drawingData.entry_deadline}</div>
                    <div>{drawingData.drawing_date}</div>
                </div>
            );
        });

        const entries = promotionData.entries.map(entryData => {
            return (
                <div>
                    <div>{entryData.entry_number}</div>
                    <div>{entryData.date}</div>
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