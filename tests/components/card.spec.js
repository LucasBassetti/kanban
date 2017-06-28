// import React from 'react';
// import uuid from 'uuid';
// import { describe, it, after } from 'mocha';
// import { expect } from 'chai';
// import { mount } from 'enzyme';
// import HTML5Backend from 'react-dnd-html5-backend';
// import { DragDropContext } from 'react-dnd';
// import Card from '../../app/js/containers/Card';
// import CardComponent from '../../app/js/components/Card';
// import Editable from '../../app/js/components/Editable';
//
// describe('Card', () => {
//   const WrapperCard = DragDropContext(HTML5Backend)(Card);
//   const card = {
//     id: uuid.v4(),
//   };
//
//   const wrapper = mount(
//     <WrapperCard
//       id={card.id}
//     >
//       <Editable
//         editing={false}
//         id={card.id}
//         value="New Card"
//         onEdit={() => {}}
//         onValueClick={() => {}}
//       />
//     </WrapperCard>,
//   );
//
//   after(() => {
//     wrapper.unmount();
//   });
//
//   it('should render Card container', () => {
//     expect(wrapper.find(Card)).to.exist;
//   });
//
//   it('should render Card component', () => {
//     expect(wrapper.find(CardComponent)).to.exist;
//   });
//
//   it('should render Editable', () => {
//     expect(wrapper.find(Editable)).to.exist;
//   });
//
//   it('should render Editable readOnly input', () => {
//     expect(wrapper.find('input')).to.exist;
//     expect(wrapper.find('input').props().readOnly).to.be.equal(true);
//   });
// });
