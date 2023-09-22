export function ArrayToTree<T extends { parentId: number; id: number }>(
  arr: T[],
  parent = 0
): T[] {
  return arr
    .filter((item: T) => item.parentId === parent)
    .map((child: T) => ({
      ...child,
      children: ArrayToTree(arr, child.id),
    }));
}

export const formatCurrency = (n: string | number) => {
  if (typeof n === 'string') {
    n = n.split(',').join('');
  }
  if (!n) {
    return '';
  }
  n = Number(n);
  if (isNaN(n)) {
    return '';
  }
  n = n.toString();
  return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const renderStatus = (value: string) => {
  switch (value) {
    case 'N':
      return 'Chờ duyệt';
    case 'A':
      return 'Đã duyệt';
    case 'R':
      return 'Từ chối';
    case 'C':
      return 'Huỷ giao dịch';
  }
}