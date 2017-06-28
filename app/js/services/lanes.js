import uuid from 'uuid';

let lanes = [
  {
    id: uuid.v4(),
    name: 'Unlabeled',
    cards: [],
  },
  {
    id: uuid.v4(),
    labelId: '1',
    cards: [],
  },
  {
    id: uuid.v4(),
    labelId: '2',
    collapsed: false,
    cards: [],
  },
  {
    id: uuid.v4(),
    labelId: '3',
    collapsed: true,
    cards: [],
  },
  {
    id: uuid.v4(),
    labelId: '4',
    collapsed: false,
    cards: [],
  },
];

const loadAllLanes = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(lanes);
  }, 100);
});

const updateLanes = (updatedLanes) => {
  lanes = JSON.parse(JSON.stringify(updatedLanes));
};

export {
  loadAllLanes,
  updateLanes,
};
