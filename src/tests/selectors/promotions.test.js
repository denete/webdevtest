import getSortedPromotions from "./../../reactjs/selectors/promotions";
import testData from "./../testData";

test("should order the promotions correctly", () => {
    const result = getSortedPromotions(testData);
    expect(result.promotion_objects[0].promotion_name).toEqual("Millionaire Madness Second-Chance Promotion");
    expect(result.promotion_objects[1].promotion_name).toEqual("$1,000,000 Fortune Second-Chance Promotion");
    expect(result.promotion_objects[2].promotion_name).toEqual("Money Money Millionaire Second-Chance Promotion");
});