import React from 'react';
import { shallow } from 'enzyme';
import { nodeWithIntlProp } from "./../IntlTestHelper";
import { PromotionListItem } from "./../../reactjs/components/PromotionListItem";
import testData from "./../testData";

test('should render PromotionItem correctly', () => {
    const wrapper = shallow(nodeWithIntlProp(<PromotionListItem serverTimeData={testData.server_time} promotionData={testData.promotion_objects[0]} url={"url"} />));
    expect(wrapper).toMatchSnapshot();
});