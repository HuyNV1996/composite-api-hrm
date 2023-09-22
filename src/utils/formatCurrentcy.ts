export const formatCurrency = (value: string) => {
  return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
};
