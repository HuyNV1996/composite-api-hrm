export const formatDateText = (dateStr: string) => {
  var date = new Date(dateStr);
  var monthName = date.toLocaleString('default', { month: 'long' });
  var monthName = date.toLocaleString('default', { month: 'short' });
};
