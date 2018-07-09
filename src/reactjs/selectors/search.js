const getFilteredPromotions = (promotions, filters) => {
    if(filters.text) {
        const filtered = promotions.data.promotion_objects.filter(promotion => promotion.promotion_name.indexOf(filters.text) > -1);

        return {
                data: {
                    promotion_objects: filtered
                }
        }
    }
    return promotions;
};

export default getFilteredPromotions;