import React from 'react';
import { shallow, mount, render } from 'enzyme';
import InsertForm from '../../components/InsertForm';

/* describe('Test supervisors array in InsertForm', () => {
  it('should be populated after useEffect', () => {
    const wrapper = mount(<InsertForm />);

    const supervisorsState = wrapper.find('InsertForm').state('supervisors');
    expect(supervisorsState).not.toHaveLength(0);
  });
}); */

describe('Unit testing',() => {
    it('should run without any issues', () => {
        expect(shallow(<InsertForm />).contains( <form
            onSubmit={handleSubmit(onSubmit)}></form>)).toBe(true);
    });
});