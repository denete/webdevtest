import React from 'react';
import { shallow } from 'enzyme';
import { nodeWithIntlProp } from "./../IntlTestHelper";
import { ErrorComponent } from "./../../reactjs/components/ErrorComponent";

test('should render ErrorComponent correctly', () => {
    const wrapper = shallow(nodeWithIntlProp(<ErrorComponent />));
    expect(wrapper).toMatchSnapshot();
});