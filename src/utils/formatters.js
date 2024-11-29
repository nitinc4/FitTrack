import { format } from 'date-fns';

export const formatNumber = (num) => {
  return num.toLocaleString();
};

export const formatDate = (date) => {
  return format(new Date(date), 'PPP');
};

export const formatTime = (date) => {
  return format(new Date(date), 'p');
};

export const calculateProgress = (value, max) => {
  return Math.min((value / max) * 100, 100);
};