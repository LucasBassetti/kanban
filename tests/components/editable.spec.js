import React from 'react';
import uuid from 'uuid';
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import DropdownMenu from 'react-dd-menu';
import Editable from '../../app/js/components/Editable';

chai.use(sinonChai);

describe('Editable', () => {
  const onEdit = sinon.spy();
  const onDelete = sinon.spy();

  const props = {
    id: uuid.v4(),
    value: 'New Card',
    onEdit,
    onDelete,
  };

  const wrapper = mount(
    <Editable {...props} />,
  );

  it('should render', () => {
    expect(wrapper.find(Editable)).to.exist;
  });

  it('should input be read only', () => {
    expect(wrapper.find('input').props().readOnly).to.be.equal(true);
  });

  it('should focus input', () => {
    wrapper.setState({ editing: true });
    expect(wrapper.find('input').props().autoFocus).to.be.equal(true);
  });

  it('should render New Card text in the input', () => {
    expect(wrapper.find('input').props().defaultValue).to.be.equal('New Card');
  });

  it('should render a DropdownMenu', () => {
    expect(wrapper.find(DropdownMenu)).to.exist;
  });

  it('should call onDelete', () => {
    wrapper.find('a').simulate('click'); // open DropdownMenu
    wrapper.find('.delete').simulate('click');
    expect(onDelete).to.have.been.calledOnce;
  });
});
