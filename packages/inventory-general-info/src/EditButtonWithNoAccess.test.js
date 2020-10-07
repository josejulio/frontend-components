import React from 'react';
import { mount } from 'enzyme';
import { PencilAltIcon } from '@patternfly/react-icons';

import EditButton from './EditButton';

jest.mock('@redhat-cloud-services/frontend-components-utilities/files/RBACHook', () => ({
    esModule: true,
    usePermissions: () => ({ hasAccess: false })
}));

describe('EditButton with no access', () => {
    let onClick;
    let link;

    beforeEach(() => {
        onClick = jest.fn();
        link = 'some-link';
    });

    it('do not render with permission', () => {
        const wrapper = mount(<EditButton
            onClick={onClick}
            link={link}
        />);

        expect(wrapper.find(PencilAltIcon)).toHaveLength(0);
        expect(wrapper.find('a')).toHaveLength(0);
    });

    it('render on production', () => {
        const tmp = insights.chrome.isProd;
        insights.chrome.isProd = true;

        const wrapper = mount(<EditButton
            onClick={onClick}
            link={link}
        />);

        expect(wrapper.find(PencilAltIcon)).toHaveLength(1);
        expect(wrapper.find('a').props().href).toEqual('http://localhost:5000//some-link');

        insights.chrome.isProd = tmp;
    });
});
