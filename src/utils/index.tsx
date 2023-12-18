import moment from 'moment';

export const createArrayOfObjects = (count: number): Item[] => {
  return Array.from({length: count}, (_, index) => ({id: index + 1}));
};

export const formatDate = (isoDateTime: string) => {
  return moment(isoDateTime).format('MMMM DD, YYYY');
};

export const formatTime = (isoDateTime: string) => {
  return moment(isoDateTime).format('h:mm:ss A');
};
