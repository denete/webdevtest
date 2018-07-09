import React from 'react';
import { shallow } from 'enzyme';
import { nodeWithIntlProp } from "./../IntlTestHelper";
import { LoaderComponent } from "./../../reactjs/components/LoaderComponent";

test('should render LoaderComponent correctly', () => {
    const wrapper = shallow(nodeWithIntlProp(<LoaderComponent />));
    expect(wrapper).toMatchSnapshot();
});