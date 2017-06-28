import uuid from 'uuid';
import { labels } from './labels';

let cards = [
  {
    id: uuid.v4(),
    text: 'Unlabeled Card',
  },
  {
    id: uuid.v4(),
    text: 'New Card',
    labelId: labels[0].id,
  },
  {
    id: uuid.v4(),
    text: 'New Card 2',
    labelId: labels[0].id,
  },
  {
    id: uuid.v4(),
    text: 'New Card 3',
    labelId: labels[1].id,
  },
];

const getCards = labelId => new Promise((resolve) => {
  setTimeout(() => {
    const filteredCards = cards.filter(card => card.labelId === labelId);
    resolve(filteredCards.map(card => card.id));
  }, 500);
});

const getUnlabeledCards = () => new Promise((resolve) => {
  setTimeout(() => {
    const filteredCards = cards.filter(card => !card.labelId);
    resolve(filteredCards.map(card => card.id));
  }, 100);
});

const loadAllCards = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(cards);
  }, 100);
});

const updateCards = (updatedCards) => {
  cards = JSON.parse(JSON.stringify(updatedCards));
};

export {
  getCards,
  getUnlabeledCards,
  loadAllCards,
  updateCards,
};
