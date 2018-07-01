import React from 'react';
import { shallow } from 'enzyme';
import { nodeWithIntlProp } from "./../IntlTestHelper";
import { PromotionItem } from "./../../reactjs/components/PromotionItem";
import testData from "./../testData";

test('should render PromotionItem correctly', () => {
    const wrapper = shallow(nodeWithIntlProp(<PromotionItem data={testData} promotionIndex={0} />));
    expect(wrapper).toMatchSnapshot();
});