const labels = [
  { id: '1', value: 'Backlog' },
  { id: '2', value: 'Review' },
  { id: '3', value: 'Drafts' },
  { id: '4', value: 'Development' },
  { id: '5', value: 'Integration' },
  { id: '6', value: 'Testing' },
];

const getLabels = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(labels);
  }, 1000);
});

export {
  labels,
  getLabels,
};
