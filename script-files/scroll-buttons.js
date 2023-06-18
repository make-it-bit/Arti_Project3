const scrollableItems = document.getElementsByTagName('form');

const prev = (id) => {
  scrollableItems[id].scrollIntoView({ behavior: 'smooth' });
};

const next = (id) => {
  scrollableItems[id].scrollIntoView({ behavior: 'smooth' });
};
