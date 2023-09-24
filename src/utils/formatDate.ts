import moment from 'moment';
import dayjs from 'dayjs';
export const formatDateCallApi = (date: string) => {
  return dayjs(date, 'YYYY-MM-DD')
};

export const formatDate = (date: string) => {
  return moment(date).format('DD/MM/YYYY');
};

